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
            padding: 10px;
            text-align: left;
        }
    }

    flex: 1;
`;