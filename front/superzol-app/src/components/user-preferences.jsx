import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/user-context';
import CustomMarks from "./slider";

export const UserPreferences = () => {
    const navigate = useNavigate();
    const { currentUser, setError} = useAuth();

    const [email, setEmail] = useState(currentUser?.email || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [distance, setDistance] = useState(currentUser?.distance_preference || 0);

    const handleSavePreferences = async () => {
        if (newPassword !== confirmPassword || newPassword.length < 6) {
            setError('New password and confirm password do not match');
            return;
        }

        // Perform API calls to update email and password
        // Assuming updateUser and updatePassword are defined in your API module
        try {
            // If the email is changed
            if (email !== currentUser.email) {
                // await updateUserEmail(currentUser.id, email);
            }

            // If the password is changed
            if (currentPassword && newPassword) {
                // await updateUserPassword(currentUser.id, currentPassword, newPassword);
            }

            // Update distance preference
            // await updateUserDistancePreference(currentUser.id, distance);

            // Re-login user to refresh context
            // await login(email, newPassword || currentPassword);
        } catch (err) {
            setError(`Error: ${err}`);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4">User Preferences</Typography>
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                sx={{ mt: 2 }}
            />
            <TextField
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                fullWidth
                sx={{ mt: 2 }}
            />
            <TextField
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
                sx={{ mt: 2 }}
            />
            <TextField
                label="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                sx={{ mt: 2 }}
            />
            <Typography variant="h6" sx={{ mt: 2 }}>
                Distance Preference (0-20 km)
            </Typography>
            <CustomMarks
                value={distance}
                onChange={(e, newValue) => setDistance(newValue)}
                aria-labelledby="distance-slider"
                min={0}
                max={20}
                valueLabelDisplay="auto"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSavePreferences}
                sx={{ mt: 3 }}
            >
                Save Preferences
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate('/home')}
                sx={{ mt: 3 }}
            >
                Back
            </Button>
        </Box>
    );
};

