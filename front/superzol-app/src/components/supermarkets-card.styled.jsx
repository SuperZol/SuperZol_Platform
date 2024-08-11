import styled from "styled-components";


export const SupermarketsContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 70%;
    overflow-y: auto;
    margin-top: 20px;
    flex: 1;
`;
export const GoogleMapsButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    img {
        width: 20px;
        height: 20px;
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
`;

export const TotalCost = styled.h3`
    width: 1px;
    padding-left: 10px;
`;

export const Address = styled.h5`
    padding-right: 10px;
`;