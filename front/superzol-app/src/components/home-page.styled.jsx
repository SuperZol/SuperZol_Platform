import {Box} from "@mui/material";
import styled from "styled-components";
import React from 'react';

const e = React.createElement;

export const MainContainer = styled(
    ({isOpen, children, ...props}) => e("div", props, children)
)`
    transition: margin-left 0.2s ease-in;
    margin-left: ${(props) => (props.isOpen ? '300px' : '0')};
`;


export const ProductsBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    text-align: center;
    margin-top: 70px;
`;