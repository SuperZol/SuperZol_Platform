import React from "react";
import {InputAdornment} from "@mui/material";
import {StyledTextField} from "./auth-text-field.styled";

const AuthTextField = ({label, value, onChange, type = "text", icon}) => {
    return (
        <StyledTextField
            label={label}
            value={value}
            onChange={onChange}
            fullWidth
            margin="normal"
            type={type}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        {icon}
                    </InputAdornment>
                ),
                style: {
                    backgroundColor: "#ECECEC",
                    borderRadius: "25px",
                    fontSize: "1.2rem",
                    height: "50px"
                },
            }}
            InputLabelProps={{
                style: {fontSize: "1.2rem"},
            }}
        />
    );
};

export default AuthTextField;