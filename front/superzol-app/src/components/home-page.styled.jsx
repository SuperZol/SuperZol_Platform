import {Box} from "@mui/material";
import styled from "styled-components";
import React from 'react';
import {ClipLoader} from "react-spinners";

const e = React.createElement;

export const MainContainer = styled(
    ({isOpen, children, ...props}) => e("div", props, children)
)`
    display: flex;
    transition: margin-left 0.2s ease-in;
    margin-left: ${(props) => (props.isOpen ? '300px' : '0')};
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