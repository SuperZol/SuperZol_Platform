import {Box, Grid, Typography} from "@mui/material";
import styled from 'styled-components';
import {Link} from "react-router-dom";
import {DARK_BLUE} from "../utils/colors";

export const StyledGrid = styled(Grid)`
    display: flex;
    flex-direction: column !important;
    justify-content: center;
    align-items: center;
`;

export const BoxIconStyled = styled(Box)`
    display: inline-flex;
    align-items: center;
    margin-left: 16px;
`;

export const TypographyTitle = styled.span`
    display: flex;
    align-items: center;
    color: ${DARK_BLUE};
    font-size: 50px;
    font-family: Rubik, sans-serif;
    font-weight: 600;
`;

export const FormContainer = styled.form`
    width: 100%;
    box-sizing: border-box;

`;
export const FormBox = styled(Box)`
    padding: 32px;
    width: 100%;
    max-width: 600px;
    box-sizing: border-box;

`;

export const TitleBox = styled(Box)`
    display: flex;
    align-items: center;
    margin-bottom: 3;
`;

export const StyledGridItem = styled(Grid)`
    font-family: Rubik, sans-serif;
    margin-top: ${(props) => props.marginTop || "0"};
    text-align: ${(props) => props.textAlign || "left"};
`;

export const ErrorTypography = styled(Typography)`
    margin-top: 10px;
    color: red;
    text-align: center;
    direction: rtl;
`;

export const LinkContainer = styled(Grid)`
    text-align: center;
    margin-top: 16px;
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${DARK_BLUE};
    margin-left: 5px;
    font-family: Rubik, sans-serif;
`;

export const LogoButton = styled.button`
    padding: 5px 10px;
    margin-bottom: 50px;
    background-color: transparent;
    border-color: transparent;
    font-size: 100px;
    font-family: Rubik, "sans-serif";
    display: flex;
    align-items: center;
    color: ${DARK_BLUE};
    transition: color 0.2s ease-in;
    font-weight: 600;
    
    img {
        width: 100px;
        height: 100px;
        transform: scaleX(-1);
        margin-left: 15px;
    }
`;