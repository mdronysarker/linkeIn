import React from "react";
import { styled } from "styled-components";

const Middle = () => {
  return (
    <>
      <Container>main</Container>
    </>
  );
};

const Container = styled.div`
  grid-area: main;
`;

export default Middle;
