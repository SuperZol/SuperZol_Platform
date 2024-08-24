import styled from 'styled-components';
import {DARK_BLUE} from "../utils/colors";

export const CartProductDiv = styled.div`
    overflow: hidden;
    width: 270px;
    height: 140px;
`;

export const CartProductImage = styled.img`
    width: 70px;
    height: 70px;
    margin-right: 10px;
`;

export const CartProductBody = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
    padding-left: 5px;
`;

export const CartProductTitle = styled.span`
    font-size: 16px;
    padding-left: 10px;
    font-weight: 600;
`;

export const CartProductPrice = styled.span`
    color: ${DARK_BLUE};
    font-size: 16px;
    font-weight: 600;
    margin-left: 15px;
`;

export const CartProductFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 260px;
`;

export const CartProductQuantity = styled.span`
    font-size: 16px;
    margin-top: 5px;
    font-weight: 500;
`;


export const ButtonsDiv = styled.div`
    display: flex;
    width: 100px;
    justify-content: space-between;
`;

export const RemoveButton = styled.button`
    position: sticky;
    background-color: #ce1b1b;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: none;
    padding: 0;
    cursor: pointer;
    font-size: 14px;
    color: white;
    line-height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        background-color: #8d0e0e;
    }
`;