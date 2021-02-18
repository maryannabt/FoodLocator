import React from 'react';
import styled from "styled-components";

import Header from "./components/Header";
import Map from "./components/Map";
import { LocationContext } from "./context/location-context";
import { useLocation } from "./hooks/location-hook";

const App = () => {
  const { location, places, filter, updateLocation, updatePlaces, updateFilter } = useLocation();

  return (
    <LocationContext.Provider
      value={{
        location: location,
        places: places,
        filter: filter,
        updateLocation: updateLocation,
        updatePlaces: updatePlaces,
        updateFilter: updateFilter
      }}
    >
      <React.Fragment>
        <Header />
        <Wrapper>
          <Map />
          <Dummy></Dummy>
        </Wrapper>
      </React.Fragment>
    </LocationContext.Provider>
  );
};

export default App;

const Wrapper = styled.div`
  width: 100%;
  padding: 0 1rem;
  display: flex;

  @media only screen and (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const Dummy = styled.div`
  background: yellow;
  flex-grow: 1;
  height: 90vh;
  overflow-y: scroll;

  @media only screen and (max-width: 768px) {
    flex-grow: 0;
    width: 100%;
    overflow-y: visible;
    height: auto;
  }
`;