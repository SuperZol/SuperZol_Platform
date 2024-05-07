import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { currentUser, logout, setError } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setError("");
      navigate("/login");
    }
  }, [currentUser, navigate, setError]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await logout();
    } catch (e) {
      setError("Failed to logout");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{ textAlign: "center" }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to Your Dashboard
      </Typography>
      <Typography variant="subtitle1">
        This is the home page of your application. Navigate through the app
        using the links or buttons provided.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 3 }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Home;
