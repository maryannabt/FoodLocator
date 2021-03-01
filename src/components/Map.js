import React, { useRef, useEffect, useContext, useCallback } from 'react';
import ReactDOM from 'react-dom';
import styled from "styled-components";

import { LocationContext } from "../context/location-context";
import InfoWindow from "./InfoWindow";

const Map = () => {
    const locationContext = useContext(LocationContext);
    const mapRef = useRef();
    let map = useRef();
    let placesService = useRef();
    let markers = useRef([]);
    let infoWindow = useRef();

    const { location, filter, updateLocation, updatePlaces } = locationContext;

    const isInfoWindowOpen = (infoWindow) => {
      let map = infoWindow.getMap();
      return (map !== null && typeof map !== "undefined");
    };

    const showInfoWindow = useCallback((marker) => {
      if(infoWindow.current && isInfoWindowOpen(infoWindow.current)) {
        return;
      }

      placesService.current.getDetails({ placeId: marker.placeResult.place_id },
        (place, status) => {
          if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
            return;
          }

          infoWindow.current = new window.google.maps.InfoWindow({
            content: '<div id="infoWindow" />',
          });

          infoWindow.current.addListener('domready', () => {
            ReactDOM.render(<InfoWindow place={place} />, document.getElementById('infoWindow'));
          });

            infoWindow.current.open(map.current, marker);
        });
    }, []);

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
        window.google.maps.event.addListener(markers.current[i], 'click', () => showInfoWindow(markers.current[i]));
        setTimeout(dropMarker(i), i * 150);
      }
    }, [showInfoWindow]);

    const sortPlaces = useCallback((placesToSort, filter) => {
      let sortedPlaces;

          if (filter === "Ratings") {
            sortedPlaces = [...placesToSort].sort((a, b) => {
              const aHasRating = a.hasOwnProperty("rating");
              const bHasRating = b.hasOwnProperty("rating");
              if (aHasRating && bHasRating) {
                return b.rating - a.rating;
              }
              return aHasRating ? -1 : bHasRating ? 1 : 0;
            });
          } else if (filter === "Price") {
            sortedPlaces = [...placesToSort].sort((a, b) => {
              const aHasPrice = a.hasOwnProperty("price_level");
              const bHasPrice = b.hasOwnProperty("price_level");
              if (aHasPrice && bHasPrice) {
                return a.price_level - b.price_level;
              }
              return aHasPrice ? -1 : bHasPrice ? 1 : 0;
            });
          } else {
            sortedPlaces = placesToSort;
          }

      return sortedPlaces;
    }, []);

    const search = useCallback((filter) => {
      const searchRequest = {
        bounds: map.current.getBounds(),
        types: ['restaurant']
      };

      if(map.current.getBounds()) {
        placesService.current.nearbySearch(searchRequest, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
            const sortedResults = sortPlaces(results, filter);
            console.log(sortedResults);
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

      window.google.maps.event.addListener(map.current, 'dragend', () => updateLocation({ geometry: { location: map.current.getCenter() } }));
    }, [search, updateLocation]);

    useEffect(() => {
      if (location.geometry && location.geometry.location) {
        if (location.address_components) {
          window.google.maps.event.clearListeners(map.current, 'zoom_changed');
          map.current.setZoom(14);
          map.current.panTo(location.geometry.location);
          search(filter);
          window.google.maps.event.addListener(map.current, 'zoom_changed', () => search(filter));
        } else {
          window.google.maps.event.addListener(map.current, 'zoom_changed', () => search(filter));
          map.current.panTo(location.geometry.location);
          search(filter);
        }
      }
    }, [location, filter, search]);

    return (
      <Wrapper>
        <MapContainer ref={mapRef} />
      </Wrapper>
    );
  };
  
  export default Map;

  const Wrapper = styled.div`
    flex-basis: calc( 100% * 2/3);
    height: 90vh;

    @media only screen and (max-width: 768px) {
        flex-basis: 100%;
        height: 40vh;
    }
  `;

  const MapContainer = styled.div`
    width: 100%;
    height: 100%
  `;