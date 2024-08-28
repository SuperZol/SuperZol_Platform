import React, {useState} from "react";
import {Typography} from "@mui/material";
import {useSearchParams} from "react-router-dom";
import AuthTextField from "./auth-text-field";
import AuthButton from "./auth-button";
import Form from "./form";
import {AuthContainer, AuthImage, DataContainer, ImageContainer} from "./auth.styled";
import LockIcon from "@mui/icons-material/Lock";
import {resetPassword} from "../api";
import {LinkContainer, LogoButton, StyledGridItem, StyledLink} from "./form.styled";
import resetPasswordImage from "../resources/man-supermarket.webp";
import superzolLogo from "../resources/superzol-logo.png";

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
            setError("הסיסמאות אינן תואמות");
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
                    src={resetPasswordImage}
                    alt="Reset Password Illustration"
                />
            </ImageContainer>
            <DataContainer>
                <LogoButton>
                    סופרזול
                    <img src={superzolLogo} alt="superzol"/>
                </LogoButton>
                <Form title="איפוס סיסמה" func={handleSubmit}>
                    <StyledGridItem>
                        <AuthTextField
                            label="סיסמה חדשה"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            icon={<LockIcon/>}
                        />
                    </StyledGridItem>
                    <StyledGridItem>
                        <AuthTextField
                            label="אימות סיסמה"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            icon={<LockIcon/>}
                        />
                    </StyledGridItem>
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
                    <StyledGridItem>
                        <AuthButton
                            type="submit"
                            loading={loading}
                            color="primary"
                            text="אפס סיסמה"
                            style={{marginTop: "16px"}}
                        />
                    </StyledGridItem>
                    <StyledGridItem>
                        <LinkContainer>
                            <StyledLink
                                onClick={() => setError("")}
                                to="/login"
                            >
                                חזרה להתחברות
                            </StyledLink>
                        </LinkContainer>
                    </StyledGridItem>
                </Form>
            </DataContainer>
        </AuthContainer>
    );
};
