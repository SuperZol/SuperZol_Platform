import styled from 'styled-components';

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
    background-color: #007bff;
    color: white;
    border: none;
    padding: 17px 15px;
    border-radius: 10000px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #0056b3;
    }

    img {
        margin-right: 6px;
        width: 40px;
        height: 40px;
        filter: invert(1) brightness(2);
    }
`;