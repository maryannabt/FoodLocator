import React, { useEffect, useContext, useCallback, useRef } from 'react';
import styled from "styled-components";

import { LocationContext } from "../context/location-context";
import gps_img from "../imgs/img_556108.png";

const SearchBox = () => {
  const locationContext = useContext(LocationContext);
  const autocompleteRef = useRef();

  const { updateLocation } = locationContext;

  const submitHandler = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  };

  const locateMe = useCallback(() => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const locationData = {
          geometry: {
            location: new window.google.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude,
            )
          }
        };

        if(autocompleteRef.current) {
          autocompleteRef.current.value = "";
        }
        updateLocation(locationData);
      });
    } else {
      console.log("This Browser does not support HTML5 geolocation.");
    }
  }, [updateLocation]);

  const initAutocomplete = useCallback(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteRef.current,
      { types: ['geocode'] });
    autocomplete.addListener('place_changed', () => updateLocation(autocomplete.getPlace()));
  }, [updateLocation]);

  useEffect(() => {
    locateMe();
    initAutocomplete();
  }, [locateMe, initAutocomplete]);  

  return (
    <Wrapper>
      <Input 
        type="text"
        placeholder="Enter a location"
        ref={autocompleteRef}
        onKeyDown={submitHandler}
      />
      <Img src={gps_img} alt="enable location icon" onClick={locateMe} />
    </Wrapper>
  );
};

export default SearchBox;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  margin-left: 2rem;

  @media only screen and (max-width: 768px) {
    width: 100%;
    justify-content: start;
    align-items: center;
    margin-left: 0;
    margin-top: 0.7rem;
  }
`;

const Input = styled.input`
  width: 32rem;
  height: 2.2rem;
  display: flex;
  align-items: center;
  padding-left: 0.75rem;
  border-radius: 4px;
  color: #555;
  font-size: 0.875rem;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Img = styled.img`
  height: 1.5625rem;
  width: 1.5625rem;
  position: absolute;
  right: 2%;
  top: 15%;
  cursor: pointer;

  @media only screen and (max-width: 768px) {
    right: 1.5%;
  }
`;

