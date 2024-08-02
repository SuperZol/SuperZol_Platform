import styled from 'styled-components';
import {IconButton, TextField} from "@mui/material";

export const SearchBarContainer = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid #e0e0e0;
    border-radius: 50px;
    padding: 5px 10px;
    width: 50%;
    margin-top: 50px;
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
        }
    }

    flex: 1;
`;

export const SearchButton = styled(IconButton)`
    background-color: #1976d2;
    color: #fff;
    border-radius: 50%;
    margin-right: 8px;

    &:hover {
        background-color: #1565c0;
    }
`;

export const CategoriesButton = styled.button`
    margin-right: 8px;
    background: none;
    color: #606060;
    border: none;
    border-left: 3px solid #606060;
    cursor: pointer;
`;