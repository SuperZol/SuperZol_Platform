import React, {useState} from "react";
import {Typography} from "@mui/material";
import AuthTextField from "./auth-text-field";
import AuthButton from "./auth-button";
import Form from "./form";
import {AuthContainer, AuthImage, DataContainer, ImageContainer} from "./auth.styled";
import EmailIcon from "@mui/icons-material/Email";
import {forgotPassword} from "../api";
import loginBackground from "../resources/man-supermarket.webp";
import {LinkContainer, LogoButton, StyledGridItem, StyledLink} from "./form.styled";
import superzolLogo from "../resources/superzol-logo.png";

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);

        try {
            const response = await forgotPassword(email);
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
    };

    return (
        <AuthContainer>
            <ImageContainer>
                <AuthImage
                    src={loginBackground}
                    alt="Forgot Password Illustration"
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
                            label="מייל"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={<EmailIcon/>}
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
                            text="שלח"
                            style={{marginTop: "16px"}}
                        />
                    </StyledGridItem>
                    <StyledGridItem>
                        <LinkContainer>
                            <StyledLink onClick={() => setError("")} to="/login">
                                חזרה להתחברות
                            </StyledLink>
                        </LinkContainer>
                    </StyledGridItem>
                </Form>
            </DataContainer>
        </AuthContainer>
    );
};
