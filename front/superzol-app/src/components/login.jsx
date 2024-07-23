import React, {useState, useEffect, useCallback} from "react";
import {
    Button,
    Grid,
    TextField,
    InputAdornment,
    Box,
    Paper,
    Typography,
    Avatar,
    CircularProgress,
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {useUser} from "../contexts/user-context";
import axios from "axios";
import "../css/auth.css";

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const {currentUser, login, setError} = useUser();
    const getLocation = useCallback(async () => {
        if (!navigator.geolocation) {
            console.log("Geolocation is not supported by your browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const {latitude, longitude} = position.coords;
                const res = await axios.get(`http://ip-api.com/json?lat=${latitude}&lon=${longitude}`);
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
            getLocation().then(r => {
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
        } catch (e) {
            setError("Failed to login: Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="root">
            <Typography variant="h1" className="title">
                SuperZol
            </Typography>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                className="grid-container"
            >
                <Paper
                    elevation={3}
                    className="paper"
                >
                    <Typography variant="h4" align="center" gutterBottom>
                        Login
                    </Typography>
                    <Avatar className="avatar">
                        <AccountCircleIcon/>
                    </Avatar>
                    <form onSubmit={handleSubmit} className="form">
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon/>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon/>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                startIcon={<PersonIcon/>}
                                type="submit"
                                disabled={loading}
                                variant="contained"
                                color="primary"
                                className="button"
                                size="large"
                                fullWidth
                            >
                                {loading ? <CircularProgress size={24}/> : "Login"}
                            </Button>
                        </Grid>
                        <Box mt={2} textAlign="center">
                            <Typography variant="body2">
                                Don't have an account?
                                <Link
                                    to="/register"
                                    style={{
                                        textDecoration: "none",
                                        color: "#3f51b5",
                                        marginLeft: "5px",
                                    }}
                                >
                                    Register
                                </Link>
                            </Typography>
                        </Box>
                    </form>
                </Paper>
            </Grid>
        </div>
    );
};
