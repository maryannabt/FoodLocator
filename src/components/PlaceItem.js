import React from 'react';
import styled from "styled-components";

const PlaceItem = ({ place, index }) => {
    return (
      <Wrapper>
        <Index>{index}</Index>
        <Address>{place.vicinity}</Address>
      </Wrapper>
    );
  };
  
  export default PlaceItem;

  const Wrapper = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    color: rgba(0, 0, 0, 0.87);
    border-bottom: 1px solid grey;
    width: 100%;
  `;

  const Index = styled.h3`
    color: grey;
    font-size: 1.125rem;
    font-weight: 500;
  `;

  const Address = styled.div`
    font-size: 0.875rem;
    line-height: 1.4;
  `;