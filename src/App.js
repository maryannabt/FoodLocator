import React from 'react';
import styled from "styled-components";

import Header from "./components/Header";
import Map from "./components/Map";
import Places from "./components/Places";
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
          <Places />
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