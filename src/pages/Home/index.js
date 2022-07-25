import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import useFetchPeople from "./useFetchPeople";

//styled components
import {
  Wrapper,
  Logo,
  SearchBox,
  SearchInput,
  SearchIcon,
  SearchDivider,
  SearchHead,
  SearchBody,
  SearchCard,
  SearchConfirmation,
} from "./components";

//icons and images from resources
import logo from "../../resources/images/star-wars-logo.png";
import clear from "../../resources/icons/cancel.svg";
import spinner from "../../resources/icons/spinner.svg";
import search from "../../resources/icons/search.svg";

const initCurrentCardState = {
  url: "#",
  number: 0,
};

function HomePage() {
  const [query, setQuery] = useState("");
  const [currentCard, setCurrentCard] = useState(initCurrentCardState);
  const [searchBodyVisibility, setSearchBodyVisibility] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const history = useHistory();
  const userInputBackup = useRef(null);
  const inputRef = useRef(null);

  //custom hook to fetch data
  const { data, isLoading, isError, clearFetchedData } = useFetchPeople(
    `https://swapi.dev/api/people/`,
    query,
    userInputBackup
  );

  const onCardSelectionHandler = () => {
    //extracting character id from url
    const { url } = currentCard;
    let arr = url?.split("/");
    while (!arr[arr?.length - 1].trim()) {
      arr.pop();
    }
    let id = arr[arr?.length - 1];
    history.push({
      pathname: `/person/${id}`,
    });
  };

  //mouse hover handlers
  const mouseEnterHandler = (number, name, url) => {
    setCurrentCard({
      number,
      url,
    });
  };

  const mouseLeaveHandler = () => {
    setCurrentCard(initCurrentCardState);
  };

  useEffect(() => {
    if (inputFocus && query?.length !== 0) {
      setSearchBodyVisibility(true);
    } else {
      setSearchBodyVisibility(false);
    }
  }, [query]);

  /**
   * KeyPressHandler --------------------------------------------------------
   * Handles the highlight and selection of cards in searchBody(search results).
   * e.preventDefault()avoid switching between first and last letter of the input value.
   * Setting the current highlighted name and their link to current state.
   * If clicked or pressed entered will be redirected to the link.
   */
  const keyPressHandler = (e) => {
    let { number, url } = currentCard;
    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        if (number < data?.length) {
          setCurrentCard({
            number: number + 1,
            url: data[number].url,
          });
          setQuery(data[number].name);
        } else {
          setCurrentCard({
            number: 0,
            url: "#",
          });
          setQuery(userInputBackup.current);
        }
        break;
      }

      case "ArrowUp": {
        e.preventDefault();
        if (number === 1) {
          setCurrentCard({
            number: number - 1,
            url: "#",
          });
          setQuery(userInputBackup.current);
        } else if (number > 1) {
          setCurrentCard({
            number: number - 1,
            url: data[number - 2]?.url,
          });
          setQuery(data[number - 2]?.name);
        } else {
          setCurrentCard({
            number: data?.length,
            url: data[data?.length - 1]?.url,
          });
          setQuery(data[data?.length - 1]?.name);
        }
        break;
      }

      case "Enter" || "NumpadEnter": {
        if (url === "#") return;
        onCardSelectionHandler();
        break;
      }

      default:
        return;
    }
  };

  /**
   * Query Handlers
   * Handles input queries.
   * setQuery() => sets the input given by user
   * userInputBackup => has the same value given by user initially.
   * A safe guard against loosing the user input when the user switches between different results with arrow keys.
   */
  const onQueryChangeHandler = (e) => {
    setQuery(e.target.value);
    userInputBackup.current = e.target.value;
    setCurrentCard(initCurrentCardState);
  };

  const clearQuery = () => {
    setQuery("");
    clearFetchedData();
  };

  //Handling input focus and search body/results
  const onFocusToggle = () => {
    if (document.activeElement === inputRef.current) {
      setInputFocus(true);
      if (data?.length > 0) {
        setSearchBodyVisibility(true);
      }
    } else {
      setInputFocus(false);
      setSearchBodyVisibility(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", onFocusToggle);

    return () => {
      // clean up function
      document.removeEventListener("click", onFocusToggle);
    };
  }, [data]);

  return (
    <Wrapper>
      <Logo>
        <img data-cy="logo" src={logo} alt="Star Wars Logo" />
      </Logo>

      <SearchBox>
        {/* Search Head Start */}
        <SearchHead>
          <SearchInput
            data-cy="input"
            ref={inputRef}
            onKeyDown={keyPressHandler}
            onChange={onQueryChangeHandler}
            value={query}
            placeholder="Search by name"
          />

          <SearchIcon
            data-cy="clear"
            hidden={query?.length === 0}
            onClick={clearQuery}
            background={false}
            src={clear}
            alt="clear"
          ></SearchIcon>
          <SearchDivider hidden={query?.length === 0} direction="vertical" />

          <SearchIcon
            background={isLoading ? false : true}
            src={isLoading ? spinner : search}
            alt="spinner"
          ></SearchIcon>
        </SearchHead>

        {searchBodyVisibility && <SearchDivider direction="horizontal" />}

        {/* Search Body Start */}

        {searchBodyVisibility && (
          <SearchBody
            data-cy="searchBody"
            onMouseLeave={mouseLeaveHandler}
            current={currentCard?.number}
          >
            {isLoading ? (
              <SearchConfirmation>
                <h2>Collecting data for you...</h2>
              </SearchConfirmation>
            ) : isError ? (
              <SearchConfirmation>
                <h2>Oops something went wrong</h2>
              </SearchConfirmation>
            ) : data?.length === 0 ? (
              <SearchConfirmation>
                <h2>No match found</h2>
              </SearchConfirmation>
            ) : (
              data?.map(({ birth_year, gender, name, url }, index) => (
                <SearchCard
                  data-cy="searchCard"
                  onClick={onCardSelectionHandler}
                  onMouseEnter={() => mouseEnterHandler(index + 1, name, url)}
                  key={url}
                >
                  <div>
                    <p>{name}</p>
                    <span>{birth_year}</span>
                  </div>
                  <div>
                    <span>{gender}</span>
                  </div>
                </SearchCard>
              ))
            )}
          </SearchBody>
        )}
      </SearchBox>
    </Wrapper>
  );
}

export default HomePage;
