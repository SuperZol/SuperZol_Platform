import styled from "styled-components";
import {Box} from "@mui/material";

export const ToolbarContainer = styled(Box)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background-color: #eaeaea;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    box-sizing: border-box;
    height: 60px;
`


export const ToolbarButton = styled.button`
    background: none;
    border: none;
    color: #1976d2;
    cursor: pointer;
    font-size: 20px;
    margin-left: 16px;
    padding: 10px 16px;

    &:hover {
        text-decoration: underline;
    }

    @media (max-width: 600px) {
        display: none;
    }
`;

export const ToolbarTitle = styled.h1`
    cursor: pointer;
    font-weight: bold;
    color: #1976d2;
    font-size: 30px;
`;


