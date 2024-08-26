import styled from 'styled-components';
import {DARK_BLUE, DARK_BROWN, LIGHT_BLUE} from "../utils/colors";

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
`;

export const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

export const CategoryButton = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    font-family: Rubik, sans-serif;
    color: ${DARK_BLUE};
    font-weight: 500;
        &:hover{
        color: ${LIGHT_BLUE};
    }
`;

export const CategoryIcon = styled.img`
    width: 50px;
    height: 50px;
    margin-bottom: 8px;
`;

export const ExitModalButton = styled.button`
    left: 0;
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