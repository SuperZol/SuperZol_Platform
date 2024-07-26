import React from "react";
import {Box, Typography, Button} from "@mui/material";
import {useNavigate, useLocation} from "react-router-dom"; // Import useLocation
import '../css/toolbar.css';
import {useUser} from '../contexts/user-context';

const Toolbar = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location
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
        <Box className="toolbar">
            <Box>
                <Button className="toolbar-button" onClick={handleLogout}>
                    <Typography variant="body1">התנתקות</Typography>
                </Button>
                <Button className="toolbar-button" onClick={() => handleNavigation('/user_preferences')}>
                    <Typography variant="body1">הגדרות</Typography>
                </Button>
            </Box>
            <Typography className="toolbar-title" onClick={() => handleNavigation('/home')}>
                סופרזול
            </Typography>
        </Box>
    );
};

export default Toolbar;
