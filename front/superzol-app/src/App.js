import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {ThemeProvider, createTheme} from '@mui/material';
import {Login} from "./components/login";
import {UserProvider} from "./contexts/user-context";
import {Register} from "./components/register";
import {Home} from "./components/home-page";
import {UserPreferences} from "./components/user-preferences";
import {ProductProvider} from "./contexts/product-context";

const theme = createTheme();

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <UserProvider>
                <ProductProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/home" element={<Home/>}/>
                        </Routes>
                    </BrowserRouter>
                </ProductProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/" element={<Navigate to="/login"/>}/>
                        <Route path="/user_preferences" element={<UserPreferences/>}/>
                    </Routes>
                </BrowserRouter>
            </UserProvider>
        </ThemeProvider>
    );
}