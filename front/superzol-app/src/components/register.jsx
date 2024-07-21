import React, {useState} from "react";
import {
    Button,
    Grid,
    TextField,
    InputAdornment,
    Box,
    Paper,
    Typography,
    Avatar,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import {Link, useNavigate} from "react-router-dom";
import {useUser} from "../contexts/user-context";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { validatePassword } from '../utils/passwordUtils';
import "../css/auth.css";

export const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const {register, setError} = useUser();

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
        } catch (e) {
            setError("Failed to register user");
        }
        setLoading(false);
        navigate("/login");
    };

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            className="root"
        >
            <Paper elevation={3} className="paper">
                <Typography variant="h4" align="center" gutterBottom>
                    Register
                </Typography>
                <Avatar className="avatar">
                    <AccountCircleIcon />
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
                                        <EmailIcon />
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
                    <Grid item xs={12}>
                        <TextField
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                    {error && (
                        <Typography color="error" variant="body2" align="center" style={{ marginTop: '10px' }}>
                            {error}
                        </Typography>
                    )}
                    <Grid item>
                        <Button
                            startIcon={<PersonIcon />}
                            type="submit"
                            disabled={loading}
                            variant="contained"
                            color="primary"
                            className="button"
                            size="large"
                            fullWidth
                        >
                            {loading ? <CircularProgress size={24} /> : "Register"}
                        </Button>
                    </Grid>
                    <Box mt={2} textAlign="center">
                        <Typography variant="body2">
                            Already have an account?
                            <Link
                                to="/login"
                                style={{
                                    textDecoration: "none",
                                    color: "#3f51b5",
                                    marginLeft: "5px",
                                }}
                            >
                                Login
                            </Link>
                        </Typography>
                    </Box>
                </form>
            </Paper>
        </Grid>
    );
};