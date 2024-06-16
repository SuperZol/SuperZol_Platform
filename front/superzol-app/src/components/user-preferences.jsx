import React, {useState} from 'react';
import {Button, TextField, Typography, Box} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../contexts/user-context';
import CustomMarks from './slider';
import {updateUser} from '../api';
import {validatePassword} from '../utils/passwordUtils';


export const UserPreferences = () => {
    const navigate = useNavigate();
    const {currentUser, updateCurrentUser} = useAuth();

    const [email, setEmail] = useState(currentUser?.email || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [distance, setDistance] = useState(currentUser?.distance_preference || 0);

    const handleSavePreferences = async () => {
        const data = {};

        if (email !== currentUser.email) {
            console.log(`email ${email} currentUser.email ${currentUser.email}`);
            data.email = email;
        }

        if (currentPassword && newPassword) {
            const passwordErrors = validatePassword(newPassword, confirmPassword);
            if (passwordErrors.length > 0) {
                console.log(passwordErrors.join(", "));
                return;
            }
            if (currentPassword !== currentUser.password) {
                console.log("The current password incorrect!")
            } else
                data.password = newPassword;
        }

        if (distance !== currentUser.distance_preference) {
            data.distance_preference = distance;
        }
        if (Object.keys(data).length === 0) {
            console.log("Nothing changed");
            return;
        }
        try {
            let res = await updateUser(currentUser.email, data);
            console.log(res.status);
            if (res.status === 200) {
                updateCurrentUser(data);
            } else {
                console.log("error"); //TODO: when we will build the page we need todo popup
            }

            console.log(`currentUser email ${currentUser.email} vs new email ${email}`);

        } catch (err) {
            console.log("Error while sending data to backend!");
        }
    };

    return (
        <Box sx={{p: 3}}>
            <Typography variant="h4">User Preferences</Typography>
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                sx={{mt: 2}}
            />
            <TextField
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                fullWidth
                sx={{mt: 2}}
            />
            <TextField
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
                sx={{mt: 2}}
            />
            <TextField
                label="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                sx={{mt: 2}}
            />
            <Typography variant="h6" sx={{mt: 2}}>
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
            <Button
                variant="contained"
                color="primary"
                onClick={handleSavePreferences}
                sx={{mt: 3}}
            >
                Save Preferences
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate('/home')}
                sx={{mt: 3}}
            >
                Back
            </Button>
        </Box>
    );
};


