import React from "react";
import styled from "styled-components";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <Header />
      <Container>
        <Section>
          <h5>
            <a>Hiring in a hurry ?</a>
            <p>
              Find talented pros in record time with Upwork and keep busness
              moving.
            </p>
          </h5>
        </Section>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding-top: 52px;
`;

const Conttent = styled.div``;

const Section = styled.section``;

export default Home;
