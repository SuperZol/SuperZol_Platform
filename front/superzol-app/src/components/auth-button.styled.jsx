import styled from "styled-components";
import { Button } from "@mui/material";

export const SubmitButton = styled(Button)`
    && {
        border-radius: 25px;
        font-size: 1.2rem;
        padding: 12px 0;
        background-color: ${props => props.color === 'primary' ? '#f4511e' : props.color};

        &:hover {
            background-color: ${props => props.color === 'primary' ? '#d84315' : props.color};
            opacity: 0.9;
        }
    }
`;