import React, {useState} from 'react';
import {Grid, Typography, Box, Container, ThemeProvider, createTheme} from '@mui/material';
import {useUser} from '../contexts/user-context';
import {updateUser} from '../api';
import {validateCurrentPassword, validateNewPassword} from '../utils/passwordUtils';
import CustomMarks from './slider';
import Toolbar from './toolbar';
import AuthTextField from './auth-text-field';
import AuthButton from './auth-button'; // Importing AuthButton
import Form from './form';

const theme = createTheme({
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
});

export const UserPreferences = () => {
    const {currentUser, updateCurrentUser, logout, updateUserToServer} = useUser();
    const [currentEmail, setCurrentEmail] = useState(currentUser?.email || '');
    const [newEmail, setNewEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [distance, setDistance] = useState(currentUser?.distance_preference || 0);
    const [loading, setLoading] = useState(false); // For loading state in AuthButton
    const [error, setError] = useState(''); // For error messages

    const handleSavePreferences = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setLoading(true);
        const data = {};

        if (currentPassword) {
            if (!validateCurrentPassword(currentPassword, currentUser.password)) {
                setError("The current password is incorrect!");
                setLoading(false);
                return;
            }

            if (newEmail !== currentEmail && newEmail) {
                data.email = newEmail;
            }

            if (distance !== currentUser.distance_preference) {
                data.distance_preference = distance;
            }

            const newPasswordValidation = validateNewPassword(currentPassword, newPassword, confirmPassword, data);
            if (newPasswordValidation !== true) {
                setError(newPasswordValidation);
                setLoading(false);
                return;
            }
        } else {
            setError("You must fill the current password!");
            setLoading(false);
            return;
        }

        if (Object.keys(data).length === 0) {
            setLoading(false);
            return;
        }

        await savePreferences(data);
    };

    const savePreferences = async (data) => {
        try {
            const res = await updateUserToServer(currentUser.email, data); // Call the updateUser method from context
            if (res.status === 200) {
                updateCurrentUser(data);
                setError(""); // Clear any previous error messages

                if (data.email) {
                    setCurrentEmail(data.email);
                    setNewEmail('');
                }

                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setError("Update failed");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Toolbar onLogout={logout}/>
            <Container maxWidth="md" sx={{mt: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Box sx={{width: '100%', maxWidth: '600px'}}>
                    <Form title="הגדרות">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <AuthTextField
                                    label="מייל נוכחי"
                                    value={currentEmail}
                                    onChange={() => {
                                    }}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <AuthTextField
                                    label="מייל חדש"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <AuthTextField
                                    label="סיסמה נוכחית"
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <AuthTextField
                                    label="סיסמה חדשה"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <AuthTextField
                                    label="אימות סיסמה חדשה"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" sx={{mt: 2, mb: 1}}>
                                    Distance Preference (0-20 km)
                                </Typography>
                                <CustomMarks
                                    value={distance}
                                    onChange={(newValue) => setDistance(newValue)}
                                    aria-labelledby="distance-slider"
                                    min={0}
                                    max={20}
                                    valueLabelDisplay="auto"
                                />
                            </Grid>
                            {error && (
                                <Grid item xs={12}>
                                    <Typography color="error" variant="body2" align="center"
                                                style={{marginTop: '10px'}}>
                                        {error}
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                        <Box sx={{mt: 4, display: 'flex', justifyContent: 'center'}}>
                            <AuthButton
                                loading={loading}
                                color="primary"
                                text="Save Preferences"
                                onClick={handleSavePreferences}
                            />
                        </Box>
                    </Form>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
