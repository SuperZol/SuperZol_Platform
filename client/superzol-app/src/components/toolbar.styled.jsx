import styled from "styled-components";
import {Box} from "@mui/material";
import {DARK_BLUE, LIGHT_BLUE} from "../utils/colors";

export const ToolbarContainer = styled(Box)`
    position: fixed;
    top: 0;
    left: ${(props) => (props.$isopen ? '320px' : '0')};
    width: ${(props) => (props.$isopen ? 'calc(100% - 310px)' : '100%')};
    margin-right: 310px;
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
    color: ${DARK_BLUE};
    transition: color 0.2s ease-in;
    font-family: Rubik, "sans-serif";
    font-weight: 600;
    
    &:hover {
        color: ${LIGHT_BLUE};
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
    font-size: 45px;
    font-family: Rubik, "sans-serif";
    display: flex;
    align-items: center;
    color: ${DARK_BLUE};
    transition: color 0.2s ease-in;
    font-weight: 600;
    
    img {
        width: 50px;
        height: 50px;
        transform: scaleX(-1);
        margin-left: 15px;
    }

    &:hover {
        color: ${LIGHT_BLUE};
    }
`;
