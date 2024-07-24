import React, { useState, useEffect, useCallback } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useUser } from "../contexts/user-context";
import axios from "axios";
import "../css/auth.css";
import AuthTextField from "../components/authTextField";
import AuthButton from "../components/button";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser, login, setError } = useUser();

  const getLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const res = await axios.get(
          `http://ip-api.com/json?lat=${latitude}&lon=${longitude}`
        );
        if (res.status === 200) {
          currentUser.lat = res.data.lat;
          currentUser.lng = res.data.lon;
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
      getLocation().then(() => {});
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
    } catch (e) {
      setError("Failed to login: Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="root">
      <div className="left-section">
        <img
          src="/path-to-your-image.jpg"
          alt="Login Illustration"
          className="left-image"
        />
      </div>
      <div className="right-section">
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          className="grid-container"
        >
          <Typography variant="h3" className="title" gutterBottom>
            Sign in to SuperZol
          </Typography>
          <Box className="box">
            <form onSubmit={handleSubmit} className="form">
              <Grid item xs={12}>
                <AuthTextField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<EmailIcon />}
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
                <AuthButton
                  type="submit"
                  loading={loading}
                  color="primary"
                  text="Sign in"
                  style={{ marginTop: "16px" }}
                />
              </Grid>

              <Grid item xs={12} style={{ textAlign: "center", marginTop: "16px" }}>
                <Typography variant="body1">
                  Don't have an account?
                  <Link
                    to="/register"
                    style={{
                      textDecoration: "none",
                      color: "#f4511e",
                      marginLeft: "5px",
                    }}
                  >
                    Sign Up now
                  </Link>
                </Typography>
              </Grid>
            </form>
          </Box>
        </Grid>
      </div>
    </div>
  );
};
