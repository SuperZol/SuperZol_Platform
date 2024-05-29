import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {ThemeProvider, createTheme} from '@mui/material';
import {Login} from "./components/login";
import {AuthProvider} from "./contexts/auth-context";
import {Register} from "./components/register";
import {Home} from "./components/home-page";
import {UserPreferences} from "./components/user-preferences";

const theme = createTheme();

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <Router>
                    <Routes>
                        {/*  BASIC ROUTES AUTH  */}
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/" element={<Navigate to="/login"/>}/>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/user_preferences" element={<UserPreferences/>}/>
                    </Routes>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}