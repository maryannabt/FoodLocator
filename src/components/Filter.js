import React from 'react';
import styled from "styled-components";

import { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

const Filter = () => {
    const [selectedFilter, setSelectedFilter] = useState("Filter By");


    return (
      <Wrapper>
          <h3>Sort Restaurants By:</h3>
          <DropDownContainer>
            {selectedFilter}
            <FontAwesomeIcon icon={faSortDown} />
          </DropDownContainer>
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
    color: rgba(0, 0, 0, 0.87);
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    border-bottom: 1px solid grey;

    @media only screen and (max-width: 768px) {
        padding-top: 1rem;
    }
  `;

  const DropDownContainer = styled.div`
    display: flex;
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