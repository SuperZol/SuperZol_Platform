import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/user-context";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { validatePassword } from '../utils/passwordUtils';
import "../css/auth.css";
import AuthTextField from "../components/authTextField";
import AuthButton from "./button-item";
import Form from "./form-item";

export const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, setError, error } = useUser();

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
      setError("Failed to register user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="root">
      <div className="left-section">
        <img
          src="/path-to-your-image.jpg"
          alt="Register Illustration"
          className="left-image"
        />
      </div>
      <div className="right-section">
        <Form title="Register to SuperZol" onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <AuthTextField
              label="Email"
              value={email}
              icon={<EmailIcon />}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <AuthTextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<LockIcon />}
            />
          </Grid>
          <Grid item xs={12}>
            <AuthTextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={<LockIcon />}
            />
          </Grid>
          {error && (
            <Typography color="error" variant="body2" align="center" style={{ marginTop: '10px' }}>
              {error}
            </Typography>
          )}
          <Grid item xs={12}>
            <AuthButton
              type="submit"
              loading={loading}
              color="primary"
              text="Register"
              style={{ marginTop: "16px" }}
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center", marginTop: "16px" }}>
            <Typography variant="body1">
              Already have an account?
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "#f4511e",
                  marginLeft: "5px",
                }}
              >
                Login
              </Link>
            </Typography>
          </Grid>
        </Form>
      </div>
    </div>
  );
};
