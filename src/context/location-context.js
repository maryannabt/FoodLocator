import { createContext } from 'react';

export const LocationContext = createContext({
  location: null,
  places: null,
  filter: null,
  updateLocation: () => {},
  updatePlaces: () => {},
  updateFilter: () => {}
});