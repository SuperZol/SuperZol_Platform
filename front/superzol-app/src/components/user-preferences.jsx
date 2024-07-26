import React, { useState } from 'react';
import { Grid, Typography, Box, Container, ThemeProvider, createTheme } from '@mui/material';
import { useUser } from '../contexts/user-context';
import { updateUser } from '../api';
import { validatePassword } from '../utils/passwordUtils';
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
    const { currentUser, updateCurrentUser, logout } = useUser();

    const [currentEmail, setCurrentEmail] = useState(currentUser?.email || '');
    const [newEmail, setNewEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [distance, setDistance] = useState(currentUser?.distance_preference || 0);
    const [loading, setLoading] = useState(false); // For loading state in AuthButton

    const handleSavePreferences = async (e) => {
         setLoading(true); // Set loading to true when starting the save process
        const data = {};
        if (newEmail !== currentEmail) {
            data.email = newEmail;
        }

        if (currentPassword) {
            if (currentPassword !== currentUser.password) {
                alert("The current password is incorrect!");
                setLoading(false); // Reset loading state
                return;
            }
            if (newPassword) {
                if (newPassword === currentPassword) {
                    alert("New password must be different from the current password!");
                    setLoading(false); // Reset loading state
                    return;
                }

                const passwordErrors = validatePassword(newPassword, confirmPassword);
                if (passwordErrors.length > 0) {
                    console.log(passwordErrors.join(", "));
                    alert(passwordErrors.join(", "));
                    setLoading(false); // Reset loading state
                    return;
                }

                data.password = newPassword;
            }
        } else if (newPassword) {
            alert("Current password is required to change password!");
            setLoading(false); // Reset loading state
            return;
        }

        if (distance !== currentUser.distance_preference) {
            data.distance_preference = distance;
        }

        if (Object.keys(data).length === 0) {
            setLoading(false); // Reset loading state
            return;
        }

        try {
            let res = await updateUser(currentUser.email, data);
            if (res.status === 200) {
                updateCurrentUser(data);
                alert("Changes saved successfully!");

                // Update the currentEmail if a new email was saved
                if (data.email) {
                    setCurrentEmail(data.email);
                    setNewEmail(''); // Clear the new email field
                }
                // Clear password fields after successful update
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                alert("Update failed");
            }
        } catch (err) {
            console.log("Error while sending data to backend!");
            alert("Error while updating. Please try again.");
        } finally {
            setLoading(false); // Reset loading state after operation
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Toolbar onLogout={logout} />
            <Container maxWidth="md" sx={{ mt: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ width: '100%', maxWidth: '600px' }}>
                    <Form title="הגדרות">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <AuthTextField
                                    label="מייל נוכחי"
                                    value={currentEmail}
                                    onChange={() => { }}
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
                                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
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
                        </Grid>
                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
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
