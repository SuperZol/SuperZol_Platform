import styled from "styled-components";
import React from 'react';

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
    background-color: #f4f4f4;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    padding: 20px;
    z-index: 2;
    transition: left 0.2s ease;
    margin-top: 40px;
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
    background-color: #fff;
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
    font-family: Calibri, sans-serif;
    margin-top: 80%;
`;

export const SubmitButton = styled.button`
    position: sticky;
    bottom: 10px;
    width: 100%;
    max-width: 300px;
    padding: 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    font-size: 18px;
    font-family: Calibri, sans-serif;
    font-weight: bold;

    &:disabled {
        background-color: #9bbadc;
    }

    &:disabled:hover {
        background-color: #9bbadc;
        cursor: not-allowed;
    }

    &:hover {
        background-color: #0056b3;
    }
`;


export const ExitButton = styled.button`
    position: fixed;
    top: 70px;
    left: 290px;
    padding: 10px 20px;
    background-color: transparent;
    color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    font-size: 26px;
    font-family: Calibri, sans-serif;
    font-weight: bold;

    &:hover {
        color: #0056b3;
    }
`;


export const Title = styled.h2`
    color: #007bff;
    top: 70px;
    font-size: 30px;
    font-family: Calibri, sans-serif;
`;


export const TopBarButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #007bff;
    width: 120px;
    height: 30px;
    border-radius: 4px;
    color: white;
    border: none;
    padding: 3px 3px;
    cursor: pointer;
    font-size: 13px;
    font-family: Calibri, sans-serif;

    &:hover {
        background-color: #0056b3;
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