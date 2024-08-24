import {Box, Grid, Typography} from "@mui/material";
import styled from 'styled-components';
import {Link} from "react-router-dom";

export const StyledGrid = styled(Grid)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
`;

export const BoxIconStyled = styled(Box)`
    display: inline-flex;
    align-items: center;
    margin-left: 16px;
`;

export const TypographyTitle = styled(Typography)`
    display: flex;
    align-items: center;
    color: ${props => props.auth ? "#122f64" : "#8bff00"}
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
    color: ${(props) => props.color || "error"};
    text-align: center;
`;

export const LinkContainer = styled(Grid)`
    text-align: center;
    margin-top: 16px;
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: #122f64;
    margin-left: 5px;
    font-family: Rubik, sans-serif;
`;