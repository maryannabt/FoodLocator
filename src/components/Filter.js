import React from 'react';
import styled from "styled-components";

import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { LocationContext } from "../context/location-context";

const Filter = () => {
    const [selectedFilter, setSelectedFilter] = useState("Filter By");
    const [display, setDisplay] = useState(false);
    const locationContext = useContext(LocationContext);
    const { updateFilter } = locationContext;


    const toggleDropDown = () => {
      setDisplay(currentDisplay => !currentDisplay);
    };

    const changeDisplaySort = (sortValue) => {
      if(selectedFilter !== sortValue) {
        setSelectedFilter(sortValue);
        updateFilter(sortValue);
      }

      setDisplay(false);
    };

    return (
      <Wrapper>
          <h3>Sort Restaurants By:</h3>
          <DropDownContainer onClick={toggleDropDown}>
            {selectedFilter}
            <FontAwesomeIcon icon={faSortDown} />
          </DropDownContainer>

          <DropDown show={display}>
            <Ratings
              onClick={() => changeDisplaySort("Ratings")}
              selected={selectedFilter}
            >
              Ratings
            </Ratings>
            <Price
              onClick={() => changeDisplaySort("Price")}
              selected={selectedFilter}
            >
              Price
            </Price>
          </DropDown>
      </Wrapper>
    );
  };
  
  export default Filter;

  const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-top: 0.5rem;
    padding-bottom: 1rem;
    font-size: 1rem;
    font-weight: 400;
    background-color: #ffffff;
    color: rgba(0, 0, 0, 0.87);
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    border-bottom: 1px solid grey;
    position: sticky;
    top: 0;
    z-index: 1;

    @media only screen and (max-width: 768px) {
        padding-top: 1rem;
    }
  `;

  const DropDownContainer = styled.div`
    width: 6.5rem;
    height: 1.625rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 0 0.7rem;
    border:solid 1px #DDD;

    & svg {
        font-weight: 900;
        font-size: 1.5rem;
        margin-left: 0.4rem;
        padding-bottom: 0.4rem;
    }

    &:hover {
        background-color: #F0F0F0;
    }
`;

const DropDown = styled.div`
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.15), 0 6px 9px rgba(0, 0, 0, 0.2);
    position: absolute;
    width: 6.5rem;
    top: 2.2rem;
    right: 0;
    display: ${props => (props.show ? "flex" : "none")};
    flex-direction: column;
    cursor: pointer;
    z-index: 1;

    @media only screen and (max-width: 768px) {
        top: 2.6rem;
    }
`;

const Ratings = styled.div`
    width: 100%;
    height: 1.625rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    font-weight: ${props => (props.selected === "Ratings" ? "600" : "400")};
    background-color: #ffffff;

    &:hover {
      background-color: #F0F0F0;
      font-weight: 600;
  }
`;

const Price = styled(Ratings)`
    border: none;
    font-weight: ${props => (props.selected === "Price" ? "600" : "400")};
`;