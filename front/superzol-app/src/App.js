import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {ThemeProvider, createTheme, CssBaseline} from '@mui/material';
import {GlobalStyles} from '@mui/system';
import {Login} from "./components/login";
import {AuthProvider} from "./contexts/auth-context";
import {Register} from "./components/register";
import {Home} from "./components/home-page";
import {HomeProvider} from "./contexts/home-context";

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
                    </Routes>
                </Router>
            </AuthProvider>
            <HomeProvider>
                <Router>
                    <Routes>
                    </Routes>
                </Router>
            </HomeProvider>
        </ThemeProvider>
    );
}