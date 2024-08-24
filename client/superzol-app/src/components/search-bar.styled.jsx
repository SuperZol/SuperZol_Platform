import styled from 'styled-components';
import {IconButton, TextField} from "@mui/material";

export const SearchBarContainer = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid #e0e0e0;
    border-radius: 20px;
    padding: 5px 10px;
    width: 50%;
    margin-top: 50px;
    background-color: white;
`;

export const StyledTextField = styled(TextField)`
    & .MuiOutlinedInput-root {
        border-radius: 50px;
        padding-right: 0;

        & fieldset {
            border: none;
        }

        & input {
            padding: 10px;
            text-align: right;
            direction: rtl;
        }
    }

    flex: 1;
`;

export const SearchButton = styled(IconButton)`
    border-radius: 50%;
    margin-right: 8px;
`;


export const CategoriesButton = styled.button`
    background: none;
    color: #264a8d;
    border: none;
    border-left: 3px solid #264a8d;
    cursor: pointer;
`;