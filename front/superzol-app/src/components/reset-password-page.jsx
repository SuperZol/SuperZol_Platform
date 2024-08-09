import React, {useState} from "react";
import {Grid, Typography} from "@mui/material";
import {Link, useSearchParams} from "react-router-dom";
import AuthTextField from "./auth-text-field";
import AuthButton from "./auth-button";
import Form from "./form";
import {AuthContainer, AuthImage, DataContainer, ImageContainer} from "./auth.styled";
import LockIcon from "@mui/icons-material/Lock";
import {resetPassword} from "../api";

export const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            const response = await resetPassword(token, newPassword);
            if (response.status === 200) {
                setMessage(response.data || "קישור לאיפוס סיסמה נשלח במייל");
            } else {
                setError(response.data.detail || "המייל שהוזן לא קיים במערכת");
            }
        } catch (err) {
            setError("שגיאה בעת שליחת מידע לשרת");
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthContainer>
            <ImageContainer>
                <AuthImage
                    src="/path-to-your-image.jpg"
                    alt="Reset Password Illustration"
                />
            </ImageContainer>
            <DataContainer>
                <Form title="איפוס סיסמה" func={handleSubmit} auth="true">
                    <Grid item xs={12}>
                        <AuthTextField
                            label="סיסמה חדשה"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            icon={<LockIcon/>}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AuthTextField
                            label="אימות סיסמה"
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
                    {message && (
                        <Typography color="primary" variant="body2" align="center" style={{marginTop: '10px'}}>
                            {message}
                        </Typography>
                    )}
                    <Grid item xs={12}>
                        <AuthButton
                            type="submit"
                            loading={loading}
                            color="primary"
                            text="אפס סיסמה"
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
                            כניסה
                        </Link>
                    </Grid>
                </Form>
            </DataContainer>
        </AuthContainer>
    );
};
