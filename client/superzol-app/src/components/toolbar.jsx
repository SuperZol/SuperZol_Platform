import React from "react";
import {Box} from "@mui/material";
import {useNavigate, useLocation} from "react-router-dom";
import {useUser} from '../contexts/user-context';
import {LogoButton, ToolbarButton, ToolbarContainer} from "./toolbar.styled";
import logo from "../resources/superzol-logo.png"

const Toolbar = (isOpen) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {logout} = useUser();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleNavigation = (path) => {
        if (location.pathname !== path) {
            navigate(path);
        }
    };
    return (
        <ToolbarContainer isOpen={isOpen.isOpen}>
            <Box>
                <ToolbarButton onClick={handleLogout}>
                    התנתקות
                </ToolbarButton>
                <ToolbarButton onClick={() => handleNavigation('/user_preferences')}>
                    הגדרות
                </ToolbarButton>
            </Box>
            <LogoButton onClick={() => handleNavigation('/home')}>
                סופרזול
                <img src={logo} alt="superzol"/>
            </LogoButton>
        </ToolbarContainer>
    );
};

export default Toolbar;
