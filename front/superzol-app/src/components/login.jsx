import React, {useState, useEffect, useCallback} from "react";
import {Grid, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import {useUser} from "../contexts/user-context";
import axios from "axios";
import AuthTextField from "./auth-text-field";
import AuthButton from "./auth-button";
import Form from "./form";
import {AuthContainer, AuthImage, DataContainer, ImageContainer} from "./auth.styled";
import loginBackground from "../resources/login-background.jpg";
import Cookies from "js-cookie";

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const {currentUser, updateCurrentUser, login, setError, error} = useUser();

    const getLocation = useCallback(async () => {
        if (!navigator.geolocation) {
            console.log("Geolocation is not supported by your browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const {latitude, longitude} = position.coords;
                const res = await axios.get(
                    `http://ip-api.com/json?lat=${latitude}&lon=${longitude}`
                );
                if (res.status === 200) {
                    Cookies.set("lat", res.data.lat, {expires: 7});
                    Cookies.set("lng", res.data.lon, {expires: 7});
                    updateCurrentUser({lat: res.data.lat, lng: res.data.lon});
                }
            },
            (error) => {
                console.error("Error getting geolocation:", error);
            }
        );
    }, [currentUser]);

    useEffect(() => {
        if (currentUser) {
            setError("");
            getLocation().then(() => {
            });
            navigate("/home");
        }
    }, [currentUser, navigate, setError, getLocation]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            await login(email, password);
            if (currentUser) {
                navigate("/home");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContainer>
            <ImageContainer>
                <AuthImage
                    src={loginBackground}
                    alt="Login Illustration"
                />
            </ImageContainer>
            <DataContainer>
                <Form title="SuperZol התחברות" func={handleSubmit} auth="true">
                    <Grid item xs={12}>
                        <AuthTextField
                            label="מייל"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={<EmailIcon/>}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AuthTextField
                            label="סיסמה"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={<LockIcon/>}
                        />
                    </Grid>
                    {error && (
                        <Typography color="error" variant="body2" align="center" style={{marginTop: '10px'}}>
                            {error}
                        </Typography>
                    )}
                    <Grid item xs={12}>
                        <AuthButton
                            type="submit"
                            loading={loading}
                            color="primary"
                            text="כניסה"
                            style={{marginTop: "16px"}}
                        />
                    </Grid>

                    <Grid item xs={12} style={{textAlign: "center", marginTop: "16px"}}>
                        <Link
                            onClick={() => setError("")}
                            to="/register"
                            style={{
                                textDecoration: "none",
                                color: "#f4511e",
                                marginLeft: "5px",
                            }}
                        >
                            ליצירת חשבון חדש
                        </Link>
                    </Grid>
                    <Grid item xs={12} style={{textAlign: "center", marginTop: "16px"}}>
                        <Link
                            onClick={() => setError("")}
                            to="/forgot-password"
                            style={{
                                textDecoration: "none",
                                color: "#f4511e",
                                marginLeft: "5px",
                            }}
                        >
                            שכחת סיסמה?
                        </Link>
                    </Grid>
                </Form>
            </DataContainer>
        </AuthContainer>
    );
};
