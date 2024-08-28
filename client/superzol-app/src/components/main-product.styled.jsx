import styled from 'styled-components';
import {DARK_BROWN, LIGHT_BROWN} from "../utils/colors";

export const MainProductDiv = styled.div`
    width: 250px;
    height: 250px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s ease-in-out;
    
    &:hover {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
`;

export const ProductHeader = styled.div`
    text-align: center;
    padding: 10px;
`;

export const ProductImage = styled.img`
    width: 100px;
    height: 100px;
    object-fit: contain;
    margin-top: 10px;
`;

export const MainProductBody = styled.div`
    padding: 10px;
    text-align: center;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const ProductTitle = styled.h3`
    font-size: 16px;
    margin: 0;
    padding: 5px 0;
`;

export const ProductPriceContainer = styled.div`
    margin-top: auto;
    padding: 10px;
`;

export const ProductPrice = styled.span`
    font-size: 18px;
    font-weight: bold;
    display: block;
    text-align: center;
`;

export const MainProductFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: #f8f8f8;
    flex-shrink: 0;
    border-top: 1px solid #ddd;
`;

export const QuantityButton = styled.button`
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-size: 18px;
    color: #525252;
    cursor: pointer;

    &:hover {
        background-color: #eeeeee;
    }
`;

export const ProductQuantity = styled.span`
    font-size: 16px;
`;

export const AddButton = styled.button`
    background-color: ${DARK_BROWN};
    color: white;
    border: none;
    border-radius: 10px;
    padding: 5px 10px;
    cursor: pointer;
    font-family: Rubik, sans-serif;
    &:hover {
        background-color: ${LIGHT_BROWN};
    }
`;

export const ProductWithQuantity = styled.div`
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s ease-in-out;
    width: 250px;
    height: 300px;

    &:hover {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
`;


export const ProductListContainer = styled.div`
    width: 90%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    justify-content: center;
    padding: 20px;
    justify-items: center;

    @media (min-width: 1200px) {
        grid-template-columns: repeat(auto-fit, minmax(250px, 300px));
    }
`;

export const GridItem = styled.div`
    display: flex;
    justify-content: center;
`;