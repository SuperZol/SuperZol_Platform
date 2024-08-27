import styled from 'styled-components';
import {DARK_BLUE, DARK_BROWN, LIGHT_BLUE} from "../utils/colors";

export const CartButtonContainer = styled.div`
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 1;
`;

export const CartButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${DARK_BLUE};
    color: white;
    border: none;
    padding: 17px 15px;
    border-radius: 10000px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: ${LIGHT_BLUE};
    }

    img {
        margin-right: 6px;
        width: 40px;
        height: 40px;
    }
`;

export const CartBadge = styled.span`
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: ${DARK_BROWN};
    color: white;
    border-radius: 50%;
    padding: 5px 8px;
    font-size: 12px;
    font-weight: bold;
`;