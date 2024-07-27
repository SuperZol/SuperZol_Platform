import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {Login} from "./components/login";
import {UserProvider} from "./contexts/user-context";
import {Register} from "./components/register";
import {Home} from "./components/home-page";
import {UserPreferences} from "./components/user-preferences";
import {ProductProvider} from "./contexts/product-context";

export default function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<Navigate to="/login"/>}/>

                    <Route path="/user_preferences" element={<UserPreferences/>}/>
                </Routes>
                <ProductProvider>
                    <Routes>
                        <Route path="/home" element={<Home/>}/>
                    </Routes>
                </ProductProvider>
            </BrowserRouter>
        </UserProvider>
    );
}