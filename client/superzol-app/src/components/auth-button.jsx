import React from "react";
import { CircularProgress } from "@mui/material";
import { SubmitButton } from "./auth-button.styled";

const AuthButton = ({ loading, color, text, onClick, ...props }) => {
    return (
        <SubmitButton
            disabled={loading}
            variant="contained"
            color={color}
            onClick={onClick}
            {...props}
        >
            {loading ? <CircularProgress size={24}/> : text}
        </SubmitButton>
    );
};

export default AuthButton;