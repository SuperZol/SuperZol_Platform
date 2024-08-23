import React, {useState} from "react";
import {Grid, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useUser} from "../contexts/user-context";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import {validatePassword} from '../utils/passwordUtils';
import AuthTextField from "./auth-text-field";
import AuthButton from "./auth-button";
import Form from "./form";
import {AuthContainer, AuthImage, DataContainer, ImageContainer} from "./auth.styled";
import loginBackground from "../resources/man-supermarket.webp";


export const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const {register, setError, error} = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const passwordErrors = validatePassword(password, confirmPassword);
        if (passwordErrors.length > 0) {
            setError(passwordErrors.join(", "));
            return;
        }

        try {
            setError("");
            setLoading(true);
            await register(email, password);
            navigate("/login");
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContainer>
            <ImageContainer>
                <AuthImage
                    src={loginBackground}
                    alt="Register Illustration"
                />
            </ImageContainer>
            <DataContainer>
                <Form title="SuperZol הרשמה" func={handleSubmit}  auth="true">
                    <Grid item xs={12}>
                        <AuthTextField
                            label="מייל"
                            value={email}
                            icon={<EmailIcon/>}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <Grid item xs={12}>
                        <AuthTextField
                            label="הזן סיסמה בשנית"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                            text="הירשם"
                            style={{marginTop: "16px"}}
                        />
                    </Grid>

                    <Grid item xs={12} style={{textAlign: "center", marginTop: "16px"}}>

                        <Link
                            onClick={() => setError("")}
                            to="/login"
                            style={{
                                textDecoration: "none",
                                color: "#f4511e",
                                marginLeft: "5px",
                            }}
                        >
                            חשבון קיים
                        </Link>
                    </Grid>
                </Form>
            </DataContainer>
        </AuthContainer>
    );
};
