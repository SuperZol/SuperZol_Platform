import styled from "styled-components";
import React from 'react';
import {DARK_BLUE, LIGHT_BLUE} from "../utils/colors";

const e = React.createElement;


export const ShoppingCartContainer = styled(
    ({isOpen, children, ...props}) => e("div", props, children)
)`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: ${(props) => (props.isOpen ? '0' : '-400px')};
    width: 300px;
    height: 100%;
    background-color: #efede9;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    padding: 20px;
    z-index: 4;
    transition: left 0.2s ease;
`;

export const ShoppingCartContent = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 70%;
    overflow-y: auto;
    margin-top: 20px;
    flex: 1;
`;


export const Item = styled.div`
    background-color: white;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin-right: 4px;
    p {
        margin: 0;
    }
`;


export const NoItemsTitle = styled.h2`
    font-size: 26px;
    margin-top: 80%;
`;

export const SubmitButton = styled.button`
    position: sticky;
    bottom: 10px;
    width: 100%;
    max-width: 300px;
    padding: 15px;
    background-color: ${DARK_BLUE};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    font-size: 18px;
    font-weight: bold;

    &:disabled {
        background-color: #9bbadc;
    }

    &:disabled:hover {
        background-color: #9bbadc;
        cursor: not-allowed;
    }

    &:hover {
        background-color: ${LIGHT_BLUE};
    }
`;


export const ExitButton = styled.button`
    position: fixed;
    left: 290px;
    background-color: transparent;
    color: ${DARK_BLUE};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    font-size: 26px;
    font-weight: bold;

    &:hover {
        color: ${LIGHT_BLUE};
    }
    img {
        width: 18px;
        height: 18px;
    }
`;


export const Title = styled.h2`
    color: ${DARK_BLUE};
    top: 70px;
    font-size: 30px;
`;


export const TopBarButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${DARK_BLUE};
    width: 120px;
    height: 30px;
    border-radius: 4px;
    color: white;
    border: none;
    padding: 3px 3px;
    cursor: pointer;
    font-size: 13px;

    &:hover {
        background-color: ${LIGHT_BLUE};
    }

    img {
        width: 20px;
        height: 20px;
        filter: invert(1) brightness(2);
    }
`;

export const HorizontalDiv = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
`;
export const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.8); // semi-transparent white background
    z-index: 1000; // ensure it's on top of other elements
`;

export const SubmitDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

export const CartCost = styled.h3`
    color: ${DARK_BLUE};
    padding: 10px;
`;