import React, { useRef, useEffect, useContext, useCallback } from 'react';
import styled from "styled-components";

import { LocationContext } from "../context/location-context";

const Map = () => {
    const locationContext = useContext(LocationContext);
    const mapRef = useRef();
    let map = useRef();
    let placesService = useRef();
    let markers = useRef([]);

    const { location, filter, updateLocation, updatePlaces } = locationContext;

    const dropMarker = (i) => {
      return () => {
        markers.current[i].setMap(map.current);
      };
    };

    const clearMarkers = () => {
      for (let i = 0; i < markers.current.length; i++) {
        if (markers.current[i]) {
          markers.current[i].setMap(null);
        }
      }
    };

    const setUpMarkers = useCallback((foundPlaces) => {
      clearMarkers();

      for (let i = 0; i < foundPlaces.length; i++) {
        const markerIcon = `https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=${(i + 1)}|800000|ffffff`;

        markers.current[i] = new window.google.maps.Marker({
          position: foundPlaces[i].geometry.location,
          animation: window.google.maps.Animation.DROP,
          icon: markerIcon
        });

        markers.current[i].placeResult = foundPlaces[i];
        setTimeout(dropMarker(i), i * 150);
      }
    }, []);

    const sortPlaces = useCallback((placesToSort) => {
      if (filter === 'Ratings') {
        return placesToSort.sort((a, b) => b.rating - a.rating);
      } else if (filter === 'Price') {
        return placesToSort.sort((a, b) => a.price_level - b.price_level);
      } else {
        return placesToSort;
      }
    }, [filter]);

    const search = useCallback(() => {
      const searchRequest = {
        bounds: map.current.getBounds(),
        types: ['restaurant']
      };

      if(map.current.getBounds()) {
        placesService.current.nearbySearch(searchRequest, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
            console.log(results);
            const sortedResults = sortPlaces(results);
            updatePlaces(sortedResults);
            setUpMarkers(sortedResults);
          }
        });
      }
    }, [setUpMarkers, sortPlaces, updatePlaces]);

    useEffect(() => {
      const mapOptions = {
        zoom: 14,
        center: new window.google.maps.LatLng(32.079872, 34.8520448),
        mapTypeControl: false,
        streetViewControl: false
      };

      map.current = new window.google.maps.Map(mapRef.current, mapOptions);
      placesService.current = new window.google.maps.places.PlacesService(map.current);

      window.google.maps.event.addListener(map.current, 'zoom_changed', () => search());
      window.google.maps.event.addListener(map.current, 'dragend', () => updateLocation({ geometry: { location: map.current.getCenter() } }));
    }, [search, updateLocation]);

    useEffect(() => {
      if (location.geometry && location.geometry.location) {
        if (location.address_components) {
          window.google.maps.event.clearListeners(map.current, 'zoom_changed');
          map.current.setZoom(14);
          map.current.panTo(location.geometry.location);
          search();
          window.google.maps.event.addListener(map.current, 'zoom_changed', () => search());
        } else {
          map.current.panTo(location.geometry.location);
          search();
        }
      }
    }, [location, search]);

    return (
      <Wrapper>
        <MapContainer ref={mapRef} />
      </Wrapper>
    );
  };
  
  export default Map;

  const Wrapper = styled.div`
    flex-grow: 2;
    height: 90vh;
    padding-right: 1rem;

    @media only screen and (max-width: 768px) {
        flex-grow: 0;
        width: 100%;
        height: 40vh;
    }
  `;

  const MapContainer = styled.div`
    width: 100%;
    height: 100%
  `;