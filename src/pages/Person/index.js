import React from "react";
import { useParams } from "react-router";
import useFetchPerson from "./useFetchPerson";
import { Link } from "react-router-dom";

//styled components
import {
  Wrapper,
  PersonHeader,
  PersonBody,
  PersonWallpaper,
  PersonInfo,
  PersonNav,
  PersonConfirmation,
} from "./components";

//images and icons
import back from "../../resources/icons/back.svg";
import wallpaperOne from "../../resources/images/wallpaperOne.jpg";
import wallpaperTwo from "../../resources/images/wallpaperTwo.jpg";
import wallpaperThree from "../../resources/images/wallpaperThree.jpg";
import wallpaperFour from "../../resources/images/wallpaperFour.jpg";

const wallpaperArray = [
  wallpaperOne,
  wallpaperTwo,
  wallpaperThree,
  wallpaperFour,
];

function Person() {
  const { id } = useParams();

  //custom hook for fetching data
  const { data, isLoading, isError } = useFetchPerson(
    `https://swapi.dev/api/people/${id}/`
  );

  const { name, birth_year, gender, hair_color, height, mass, skin_color } =
    data;

  //generates random indexes to display random picture
  const randomWallpaperChooser = () => {
    return Math.floor(Math.random() * 10000) % 4;
  };

  return (
    <>
      {isLoading ? (
        <PersonConfirmation>
          <h2>Loading</h2>
        </PersonConfirmation>
      ) : isError ? (
        <PersonConfirmation>
          <h2>Something went wrong</h2>
        </PersonConfirmation>
      ) : (
        <Wrapper data-cy="person">
          <PersonInfo>
            <Link data-cy="backToHome" to="/">
              <PersonNav>
                <img src={back} alt="back"></img>
                <p>Back to home</p>
              </PersonNav>
            </Link>

            <PersonHeader>
              <h1 data-cy="name">{name}</h1>
            </PersonHeader>
            <PersonBody>
              <div>
                <b>Birth Year</b>
                <p>{birth_year}</p>
              </div>
              <div>
                <b>Gender</b>
                <p>{gender}</p>
              </div>
              <div>
                <b>Hair Color</b>
                <p>{hair_color}</p>
              </div>
              <div>
                <b>Height</b>
                <p>{height}</p>
              </div>
              <div>
                <b>Mass</b>
                <p>{mass}</p>
              </div>
              <div>
                <b>Skin Color</b>
                <p>{skin_color}</p>
              </div>
            </PersonBody>
          </PersonInfo>
          <PersonWallpaper
            backgroundImg={wallpaperArray[randomWallpaperChooser()]}
          />
        </Wrapper>
      )}
    </>
  );
}

export default Person;
