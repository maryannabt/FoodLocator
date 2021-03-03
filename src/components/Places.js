import React from 'react';
import styled from "styled-components";
import { useContext, useRef, useEffect } from 'react';

import { LocationContext } from "../context/location-context";
import Filter from "./Filter";
import PlacesList from "./PlacesList";

const Places = () => {
    const locationContext = useContext(LocationContext);
    const { filter } = locationContext;
    const listRef = useRef();

    useEffect(() => {
      listRef.current.scrollTop = 0;
    }, [filter]);

    return (
      <Wrapper ref={listRef}>
        <Filter />
        <PlacesList />
      </Wrapper>
    );
  };
  
  export default Places;

  const Wrapper = styled.div`
    flex-basis: calc(100% / 3);
    min-width: 21rem;
    height: 90vh;
    padding: 0 1rem;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;

    @media only screen and (max-width: 768px) {
        flex-basis: 100%;
        overflow-y: visible;
        height: auto;
        padding: 0;
    }
  `;