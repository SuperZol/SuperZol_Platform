import styled from 'styled-components';
import {TextField} from "@mui/material";

export const StyledTextField = styled(TextField)`
    & .MuiOutlinedInput-root {
        border-radius: 15px;
        padding-right: 0;
        border-color: #e0e0e0;

        & input {
            padding-bottom: 10px;
            padding-top: 10px;
            text-align: left;
            font-size: 1.2rem;
        }

        &:-webkit-autofill,
        & input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0 1000px white inset !important;
            -webkit-text-fill-color: inherit !important;
        }

        background-color: #ffffff;
        font-size: 1.2rem;
    }

    & .MuiInputLabel-root {
        font-size: 1.2rem;
    }

    flex: 1;
    border-radius: 15px;
`;

