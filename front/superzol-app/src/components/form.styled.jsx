import {Box, Grid, Typography} from "@mui/material";
import styled from "styled-components";

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
    color: ${props => props.auth ? "#1976d2" : "#8bff00"}
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

