// components/AuthTextField.jsx
import React from "react";
import {TextField, InputAdornment} from "@mui/material";

const AuthTextField = ({label, value, onChange, type = "text", icon}) => {
    return (
        <TextField
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
                style: {backgroundColor: "#ECECEC", borderRadius: "25px"},

            }}
        />
    );
};

export default AuthTextField;
