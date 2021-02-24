import React from 'react';
import styled from "styled-components";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

const InfoWindow = ({ place }) => {
    const openText = place.opening_hours ? (place.opening_hours.isOpen() ? ' Open Now' : ' Currently Closed') : ' Hours N/A';

    const priceLevel = () => {
        if(!place.price_level) {
            return (
                <span>Price N/A</span>
            ); 
        } else {
            return (
                <span>
                  {place.price_level >= 1 ? <FontAwesomeIcon icon={faDollarSign} /> : <i className="fa fa-usd" />}
                  {place.price_level >= 2 ? <FontAwesomeIcon icon={faDollarSign} /> : <i className="fa fa-usd" />}
                  {place.price_level >= 3 ? <FontAwesomeIcon icon={faDollarSign} /> : <i className="fa fa-usd" />}
                  {place.price_level >= 4 ? <FontAwesomeIcon icon={faDollarSign} /> : <i className="fa fa-usd" />}
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
    text-align: center;
  `;

  const Title = styled.h2`
    color: rgba(0, 0, 0, 0.87);
    font-size: 1.4rem;
    font-weight: 400;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    line-height: 1.3em;
    margin-bottom: 0.35em;
  `;

  const Address = styled.p`
    color: rgba(0, 0, 0, 0.87);
    font-size: 0.875rem;
    font-weight: 400;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    line-height: 1.4em;
    margin-bottom: 0.2em;
  `;

  const Info = styled(Address)`
    color: #333;
    margin-bottom: 0;

    & i {
      color: grey;
    }
  `;