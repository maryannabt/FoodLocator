import React from 'react';
import styled from "styled-components";

import SearchBox from "./SearchBox";

const Header = () => {
    return (
      <Wrapper>
        <Title href="#">FoodLocator</Title>
        <SearchBox />
      </Wrapper>
    );
  };
  
  export default Header;

  const Wrapper = styled.div`
    background-color: #800000;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    width: 100%;
    box-shadow: 0 5px 10px rgba(0,0,0,0.49);
    
    @media only screen and (max-width: 768px) {
        flex-wrap: wrap;
    }
  `;

  const Title = styled.a`
    color: white;
    font-size: 2rem;
    font-weight: 700;
    line-height: 2rem;
    text-decoration: none;
  `;