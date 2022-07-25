import styled from "styled-components";

//all styled components for home page

const Wrapper = styled.div`
  width: 95%;
  max-width: 500px;
  margin: 0 auto;
  padding: 5px;
  min-height: 600px; //stops search box from moving
`;

const Logo = styled.div`
  margin-bottom: 35px;

  text-align: center;

  img {
    width: 200px;
  }
`;

const SearchBox = styled.div`
  width: 100%;
  border-radius: 25px;
  padding: 5px 0px;

  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.backgroundColorSecondary};
`;

const SearchHead = styled.div`
  width: 95%;
  margin: 0 auto;
  border-radius: 25px;
  padding: 0px 5px;

  display: flex;
  align-items: center;
  gap: 5px;

  > * {
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 5px 0;
  }
`;

const SearchInput = styled.input`
  border: 0;
  outline: 0;
  flex: 8;

  height: 30px;
  background: inherit;

  color: ${(props) => props.theme.fontColorPrimary};
  font-size: 16px;
  text-transform: capitalize;
`;

const SearchDivider = styled.div`
  height: ${(props) => (props.direction === "vertical" ? "35px" : "1px")};
  width: ${(props) => (props.direction === "vertical" ? "1px" : "98%")};
  margin: 3px auto;

  background: ${(props) => props.theme.backgroundColorPrimary};
  visibility: ${(props) => (props.hidden ? "hidden" : "visible")};
`;

const SearchIcon = styled.img`
  flex: 1;
  visibility: ${(props) => (props.hidden ? "hidden" : "visible")};
  background: ${(props) =>
    props.background ? props.theme.backgroundColorTertiary : "inherit"};

  border-radius: 50%;
  padding: 5px;
  max-width: 25px;
`;

const SearchBody = styled.div`
  display: flex;
  flex-direction: column;

  padding-bottom: 10px;

  //highlighting the hovered / selected card from the search results
  > div:nth-child(${(props) => props.current}) {
    transition: all 500ms ease;
    background: ${(props) => props.theme.backgroundColorTertiary};
    color: ${(props) => props.theme.fontColorTertiary};
  }
`;

const SearchCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 5px 15px;

  border-radius: 2px;

  color: ${(props) => props.theme.fontColorPrimary};
  cursor: pointer;

  p {
    font-size: 16px;
    font-weight: 500;

    margin: 0;
  }

  span {
    font-size: 14px;
    text-transform: capitalize;

    margin: 0;
  }
`;

const SearchConfirmation = styled.div`
  color: ${(props) => props.theme.fontColorPrimary};
  text-align: center;
`;

export {
  Wrapper,
  Logo,
  SearchHead,
  SearchInput,
  SearchIcon,
  SearchBox,
  SearchDivider,
  SearchBody,
  SearchCard,
  SearchConfirmation,
};
