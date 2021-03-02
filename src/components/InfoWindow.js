import React from 'react';
import styled from "styled-components";

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
                  {place.price_level >= 1 ? <Icon filled><i className="fa fa-usd" /></Icon> : <Icon><i className="fa fa-usd" /></Icon>}
                  {place.price_level >= 2 ? <Icon filled><i className="fa fa-usd" /></Icon> : <Icon><i className="fa fa-usd" /></Icon>}
                  {place.price_level >= 3 ? <Icon filled><i className="fa fa-usd" /></Icon> : <Icon><i className="fa fa-usd" /></Icon>}
                  {place.price_level >= 4 ? <Icon filled><i className="fa fa-usd" /></Icon> : <Icon><i className="fa fa-usd" /></Icon>}
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
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    color: rgba(0, 0, 0, 0.87);
  `;

  const Title = styled.h2`
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.3;
    margin-bottom: 0.35em;

    @media only screen and (max-width: 768px) {
      font-size: 1.2rem;
    }
  `;

  const Address = styled.p`
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.4;
    margin-bottom: 0.2em;

    @media only screen and (max-width: 768px) {
      font-size: 0.775rem;
    }
  `;

  const Info = styled(Address)`
    color: #333;
    margin-bottom: 0;
  `;

  const Icon = styled.span`
    & i {
      color: ${props => (props.filled ? "inherit" : "grey")};
      font-weight: ${props => (props.filled ? "600" : "inherit")};
    }
  `;