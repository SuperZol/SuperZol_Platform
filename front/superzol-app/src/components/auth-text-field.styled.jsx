import styled from 'styled-components';
import {TextField} from "@mui/material";



export const StyledTextField = styled(TextField)`

    & .MuiOutlinedInput-root {
        border-radius: 100px;
        padding-right: 0;

        & fieldset {
            border: none;
        }

        & input {
            padding-bottom: 10px;
            padding-top: 10px;
            text-align: left;
        }

        &:-webkit-autofill,
        & input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0 1000px #ECECEC inset !important;
            -webkit-text-fill-color: inherit !important;
        }
    }

    flex: 1;
`;