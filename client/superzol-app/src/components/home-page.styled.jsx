import {Box} from "@mui/material";
import styled from "styled-components";
import React from 'react';
import {ClipLoader} from "react-spinners";
import {DARK_BLUE, LIGHT_BLUE, MAIN_BACKGROUND} from "../utils/colors";

const e = React.createElement;

export const MainContainer = styled(
    ({isOpen, children, ...props}) => e("div", props, children)
)`
    display: flex;
    transition: margin-left 0.2s ease-in;
    margin-left: ${(props) => (props.isOpen ? '310px' : '0')};
    background-color: ${MAIN_BACKGROUND};
`;

export const ProductsBox = styled(Box)`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    text-align: center;
    margin-top: 70px;
    padding-top: 20px;
`;

export const NavigationButtons = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    visibility: ${props => props.visible ? 'visible' : 'hidden'};
`;


export const ClipLoaderHome = styled(ClipLoader)`
    margin-top: 350px;
`;

export const PageButton = styled.button`
    font-family: Rubik, sans-serif;
    background-color: transparent;
    border-color: transparent;
    font-size: 20px;
    margin-bottom: 20px;
    color: ${DARK_BLUE};

    &:hover {
        color: ${LIGHT_BLUE}
    }
`;

export const CurrentCategoryContainer = styled.div`
    border-radius: 15px;
    margin-top: 10px;
    background-color: rgba(0, 0, 0, 0.3);
    color: white;
    padding: 2px 2px 2px 7px;
    font-size: 15px;
`;

export const RemoveCurrentCategory = styled.button`
    margin: 5px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    font-family: Rubik, sans-serif;
    font-size: 15px;
    background-color: rgba(255, 255, 255, 0.3);
    color: white;
`;