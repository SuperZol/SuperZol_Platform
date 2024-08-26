import styled from "styled-components";

export const SubmitButton = styled.button`
    width: 100%;
    font-family: Rubik, sans-serif;
    border-radius: 15px;
    font-size: 1.2rem;
    padding: 12px 0;
    background-color: ${props => props.color === 'primary' ? '#122f64' : props.color};
    border-color: transparent;
    color: white;
        &:hover {
            background-color: ${props => props.color === 'primary' ? '#1e57c2' : props.color};
            opacity: 0.9;
        }
    }
`;