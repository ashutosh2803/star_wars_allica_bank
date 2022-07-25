import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  color: ${(props) => props.theme.fontColorPrimary};
`;

function NotFound() {
  return (
    <Wrapper data-cy="notFound">
      <h1 data-cy="message">This is not the page you are looking for.</h1>
    </Wrapper>
  );
}

export default NotFound;
