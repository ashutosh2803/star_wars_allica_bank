import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function useFetchPeople(url, query, userInputBackup) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let debounceTimer = useRef();

  const getPeople = () => {
    setIsLoading(true);
    setIsError(false);
    axios
      .get(url, {
        params: {
          search: query,
        },
      })
      .then((res) => setData(res.data.results.filter((_, index) => index < 6)))
      .catch((err) => setIsError(true))
      .finally((res) => setIsLoading(false));
  };
  const clearFetchedData = () => {
    setData([]);
  };

  //reducing the number of calls while user types
  useEffect(() => {
    setIsLoading(false); // safe guard against infinite spinner.
    clearFetchedData(); // resetting data on query change

    if (
      userInputBackup.current?.trim()?.length === 0 ||
      userInputBackup.current === null
    )
      return;

    setIsLoading(true);
    debounceTimer.current && clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      getPeople();
    }, 500);

    // clean up function
    return () => {
      clearTimeout(debounceTimer.current);
    };
  }, [userInputBackup.current]);

  return { data, isLoading, isError, clearFetchedData };
}

export default useFetchPeople;
