import React from 'react';
import styled from "styled-components";
import { useContext } from 'react';

import { LocationContext } from "../context/location-context";
import PlaceItem from "./PlaceItem";

const PlacesList = () => {
    const locationContext = useContext(LocationContext);
    const { places } = locationContext;

    return (
      <Wrapper>
        {places.map((place, i) => (
            <PlaceItem
                key={place.place_id}
                index={i+1}
                place={place}
            />
        ))}
      </Wrapper>
    );
  };
  
  export default PlacesList;

  const Wrapper = styled.ul`
    list-style: none;
    margin: 0 auto;
    padding: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
  `;