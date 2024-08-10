import styled from 'styled-components';
import {media} from "./styles";

export const MainProductDiv = styled.div`
    overflow: hidden;
    width: 250px;
    height: 250px;
`;

export const ProductHeader = styled.div`
    text-align: center;
    padding: 10px;
    font-family: Calibri, sans-serif;
`;

export const ProductImage = styled.img`
    width: 100px;
    height: 100px;
`;

export const MainProductBody = styled.div`
    padding: 10px;
`;

export const ProductTitle = styled.h3`
    font-size: 16px;
`;

export const ProductPrice = styled.span`
    color: #000;
    font-size: 18px;
    font-weight: bold;
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
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-size: 18px;
    color: #888;
    cursor: pointer;
`;

export const ProductQuantity = styled.span`
    font-size: 16px;
`;

export const AddButton = styled.button`
    background-color: #ff5722;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
        background-color: #e14d1e;
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
    font-family: Calibri, sans-serif;


    &:hover {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
`;

export const ProductListContainer = styled.div`
    padding: 50px;
    box-sizing: border-box;
`;

export const GridContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: flex-start;
    ${media.xs`
        flex-direction: column;
    `}
    ${media.sm`
        flex-direction: row;
    `}
`;


export const GridItem = styled.div`
    flex: 1 1 20%;
    max-width: calc(20% - 12px);
    ${media.xs`
        flex: 1 1 100%;
        max-width: 100%;
    `}
    ${media.sm`
        flex: 1 1 50%;
        max-width: calc(50% - 12px);
    `}
    ${media.md`
        flex: 1 1 calc(33.333% - 12px);
        max-width: calc(33.333% - 12px);
    `}
    ${media.lg`
        flex: 1 1 calc(15% - 12px);
        max-width: calc(20% - 12px);
    `}
`;