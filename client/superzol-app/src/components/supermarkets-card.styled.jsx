import styled from "styled-components";


export const SupermarketsContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 80%;
    overflow-y: auto;
    margin-top: 20px;
    flex: 1;
`;
export const GoogleMapsButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    img {
        width: 30px;
        height: 30px;
    }
    padding-left: 10px;
`;

export const SupermarketImage = styled.img`
    height: 65px;
    width: 110px;
    padding-right: 10px;
    padding-top: 10px;
`;

export const RowDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`;

export const RowDiv2 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 40px;
`;

export const TotalCost = styled.h3`
    width: 1px;
    padding-left: 10px;
    font-size: 20px;
`;

export const ProductsCount = styled.h5`
    padding-right: 10px;
    direction: rtl;
    font-size: 15px;
`;

export const SupermarketDistance = styled.h5`
    direction: rtl;
    padding-left: 10px;
    font-size: 15px;
`;

export const Address = styled.h5`
    padding-right: 10px;
    font-size: 15px;
`;