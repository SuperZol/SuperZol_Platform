import styled from 'styled-components';
import {DARK_BLUE, LIGHT_BLUE} from "../utils/colors";

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