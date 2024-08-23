import React from "react";
import {Box} from "@mui/material";
import {useNavigate, useLocation} from "react-router-dom";
import {useUser} from '../contexts/user-context';
import {ToolbarButton, ToolbarContainer, ToolbarTitle} from "./toolbar.styled";

const Toolbar = () => {
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
        <ToolbarContainer>
            <Box>
                <ToolbarButton onClick={handleLogout}>
                    התנתקות
                </ToolbarButton>
                <ToolbarButton onClick={() => handleNavigation('/user_preferences')}>
                    הגדרות
                </ToolbarButton>
            </Box>
            <ToolbarTitle onClick={() => handleNavigation('/home')}>
                סופרזול
            </ToolbarTitle>
        </ToolbarContainer>
    );
};

export default Toolbar;
