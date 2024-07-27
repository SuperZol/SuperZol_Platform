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
    margin-left: 16px; /* Equivalent to ml: 2 in sx */
`;

export const TypographyTitle = styled(Typography)`
    display: flex;
    align-items: center;

`

export const FormStyle = styled.form`
    width: 100%;
    box-sizing: border-box;

`
export const BoxStyle = styled(Box)`
    padding: 32px;
    width: 100%;
    max-width: 600px;
    box-sizing: border-box;

`