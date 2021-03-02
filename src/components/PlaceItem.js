import React from 'react';
import styled from "styled-components";

const PlaceItem = ({ place, index }) => {
    const dimensions = {
      maxWidth: 125,
      maxHeight: 125,
    };

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
        <Index>{index}</Index>
        <Text>
          <Name>{place.name}</Name>
          <p>{place.vicinity}</p>
          <Info>
            { priceLevel() }
            <span>{ openText }</span>
          </Info>
        </Text>
        <Img alt="Place" src={`${place.photos ? place.photos[0].getUrl(dimensions) : 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71'}.png`} />
      </Wrapper>
    );
  };
  
  export default PlaceItem;

  const Wrapper = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    color: rgba(0, 0, 0, 0.87);
    border-bottom: 1px solid grey;
    width: 100%;
  `;

  const Index = styled.h3`
    color: grey;
    font-size: 1.125rem;
    font-weight: 500;
    margin: 0 0.5rem;

    @media only screen and (max-width: 768px) {
      margin: 0 1rem;
  }
  `;

  const Text = styled.div`
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.4;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 0.5rem;
  `;

  const Name = styled.p`
    font-weight: 600;
  `;

  const Img = styled.img`
    border-radius: 2px;
    box-shadow: rgb(0 0 0 / 20%) 0px 6px 9px;
  `;

  const Info = styled.p`
    color: #333;
  `;

  const Icon = styled.span`
    & i {
      color: ${props => (props.filled ? "inherit" : "grey")};
      font-weight: ${props => (props.filled ? "600" : "inherit")};
    }
  `;