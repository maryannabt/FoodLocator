import React from 'react';

import Header from "./components/Header";
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
      <div>
        <Header />
      </div>
    </LocationContext.Provider>
  );
};

export default App;
