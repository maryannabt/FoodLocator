import React, { useRef, useEffect } from 'react';
import styled from "styled-components";

const Map = () => {
    const mapRef = useRef();
    let map;
    let placesService;

    const [places, setPlaces] = useState([]);
    const [markers, setMarkers] = useState([]);


    useEffect(() => {
      const mapOptions = {
        zoom: 14,
        center: new window.google.maps.LatLng(32.079872, 34.8520448),
        mapTypeControl: false,
        streetViewControl: false
      };

      map = new window.google.maps.Map(mapRef.current, mapOptions);
      placesService = new window.google.maps.places.PlacesService(map);
    }, []);

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