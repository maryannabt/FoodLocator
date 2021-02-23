import React from 'react';
import styled from "styled-components";

const InfoWindow = ({ place }) => {
    const openText = place.opening_hours ? (place.opening_hours.isOpen() ? 'Open Now' : 'Currently Closed') : 'Hours N/A';

    const priceLevel = () => {
        if(!place.price_level) {
            return (
                <span>Price N/A</span>
            ); 
        } else {
            return (
                <span>
                    <i className={place.price_level >= 1 ? "fas fa-dollar-sign" : "far fa-dollar-sign"}></i>
                    <i className={place.price_level >= 2 ? "fas fa-dollar-sign" : "far fa-dollar-sign"}></i>
                    <i className={place.price_level >= 3 ? "fas fa-dollar-sign" : "far fa-dollar-sign"}></i>
                    <i className={place.price_level >= 4 ? "fas fa-dollar-sign" : "far fa-dollar-sign"}></i>
                </span>
            );
        }
    };

    return (
      <Wrapper>
        <Title>{ place.name }</Title>
        <Address>{ place.vicinity }</Address>
        <Info>
            { priceLevel() }
            <span>{ openText }</span>
        </Info>
      </Wrapper>
    );
  };
  
  export default InfoWindow;

  const Wrapper = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
  `;

  const Title = styled.h2`
    color: rgba(0, 0, 0, 0.87);
    font-size: 1.5rem;
    font-weight: 400;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    line-height: 1.35417em;
    margin-bottom: 0.35em;
  `;

  const Address = styled.p`
    color: rgba(0, 0, 0, 0.87);
    font-size: 0.875rem;
    font-weight: 400;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    line-height: 1.46429em;
    margin-bottom: 0.15em;
  `;

  const Info = styled(Address)`
    color: #333;
    margin-bottom: 0;
  `;