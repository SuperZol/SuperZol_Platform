import {Button} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";


export const UserPreferences = () => {
    const navigate = useNavigate();
    return (
        <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/home')}
            sx={{mt: 3}}
        >
            Back
        </Button>
    );
};