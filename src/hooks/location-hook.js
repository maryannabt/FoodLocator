import { useState, useCallback } from 'react';

export const useLocation = () => {
  const [location, setLocation] = useState({});
  const [places, setPlaces] = useState([]);
  const [filter, setFilter] = useState('None');

  const updateLocation = useCallback((location) => {
    setLocation(location);
    console.log(location);
  }, []);

  const updatePlaces = useCallback((places) => {
    setPlaces(places);
  }, []);

  const updateFilter = useCallback((filter) => {
    setFilter(filter);
  }, []);

  return { location, places, filter, updateLocation, updatePlaces, updateFilter };
};