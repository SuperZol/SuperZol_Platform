import React from "react";
import {Button, CircularProgress} from "@mui/material";

const AuthButton = ({loading, color, text, fullWidth = true, ...props}) => {
    return (
        <Button
            disabled={loading}
            variant="contained"
            color={color}
            fullWidth={fullWidth}
            sx={{
                borderRadius: "25px",
                fontSize: "1.2rem",
                padding: "12px 0",
                backgroundColor: "#f4511e",
                ...props.sx
            }}
            {...props}
        >
            {loading ? <CircularProgress size={24}/> : text}
        </Button>
    );
};

export default AuthButton;
