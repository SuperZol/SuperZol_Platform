import styled from "styled-components";
import {Box} from "@mui/material";

export const ToolbarContainer = styled(Box)`
    position: fixed;
    top: 0;
    left: ${(props) => (props.isOpen ? '300px' : '0')};
    width: ${(props) => (props.isOpen ? 'calc(100% - 300px)' : '100%')};
    margin-right: 300px;
    z-index: 3;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    box-sizing: border-box;
    height: 70px;
`


export const ToolbarButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
    margin-left: 16px;
    padding: 10px 16px;
    color: #122f64;
    transition: color 0.2s ease-in;
    font-family: Rubik, "sans-serif";

    &:hover {
        color: #1e57c2;
    }

    @media (max-width: 600px) {
        display: none;
    }
`;


export const LogoButton = styled.button`
    padding: 5px 10px;
    cursor: pointer;
    background-color: transparent;
    border-color: transparent;
    font-size: 50px;
    font-family: Rubik, "sans-serif";
    display: flex;
    align-items: center;
    color: #122f64;
    transition: color 0.2s ease-in;

    img {
        width: 50px;
        height: 50px;
        transform: scaleX(-1);
    }

    &:hover {
        color: #1e57c2;
    }
`;
