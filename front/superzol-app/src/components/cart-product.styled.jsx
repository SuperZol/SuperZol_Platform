import styled from 'styled-components';

export const CartProductDiv = styled.div`
    overflow: hidden;
    width: 270px;
    height: 130px;
`;

export const CartProductImage = styled.img`
    width: 70px;
    height: 70px;
`;

export const CartProductBody = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
    padding-left: 5px;
`;

export const CartProductTitle = styled.h3`
    font-size: 16px;
    padding-left: 10px;
`;

export const CartProductPrice = styled.span`
    color: #000;
    font-size: 16px;
    font-weight: bold;
`;

export const CartProductFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 250px;
`;

export const CartQuantityButton = styled.button`
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-size: 18px;
    color: #888;
    cursor: pointer;
`;

export const CartProductQuantity = styled.span`
    font-size: 16px;
`;

export const RemoveButton = styled.button`
    align-items: center;
    justify-content: center;
    background-color: #ce1b1b;
    width: 30px;
    height: 30px;
    border-radius: 4px;
    border: none;
    padding: 5px 3px;
    cursor: pointer;
    font-size: 13px;

    &:hover {
        background-color: #8d0e0e;
    }

    img {
        width: 20px;
        height: 20px;
        filter: invert(1) brightness(2);
    }
`;

export const ButtonsDiv = styled.div`
    display: flex;
    width: 130px;
    justify-content: space-between;
`;