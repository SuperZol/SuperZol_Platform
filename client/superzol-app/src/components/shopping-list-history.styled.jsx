import styled from "styled-components";
import {DARK_BROWN, LIGHT_BROWN} from "../utils/colors";

export const ShoppingListHistoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 80%;
    overflow-y: auto;
    margin-top: 20px;
    flex: 1;
`;

export const SelectButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${DARK_BROWN};
    width: 60px;
    height: 30px;
    border-radius: 4px;
    color: white;
    border: none;
    padding: 3px 3px;
    cursor: pointer;
    font-size: 13px;
    font-family: Rubik, sans-serif;

    &:hover {
        background-color: ${LIGHT_BROWN};
    }
`;


export const ShoppingListItem = styled.div`
    background-color: white;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin-right: 4px;

    p {
        margin: 0;
    }
`;

export const HorizontalDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin: 10px;
`;