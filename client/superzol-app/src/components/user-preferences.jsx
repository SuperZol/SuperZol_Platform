import React, {useState} from 'react';
import {useUser} from '../contexts/user-context';
import {validateCurrentPassword, validateNewPassword} from '../utils/passwordUtils';
import CustomMarks from './slider';
import Toolbar from './toolbar';
import AuthTextField from './auth-text-field';
import AuthButton from './auth-button';
import Form from './form';
import SettingsIcon from '@mui/icons-material/Settings';
import {ErrorTypography, StyledGridItem} from "./form.styled";
import {
    StyledButtonBox,
    StyledContainer,
    StyledContentBox,
    StyledSliderBox,
    StyledSliderTitle
} from "./user-preferences.styled";

export const UserPreferences = () => {
    const {currentUser, updateCurrentUser, logout, updateUserToServer} = useUser();
    const [currentEmail, setCurrentEmail] = useState(currentUser?.email || '');
    const [newEmail, setNewEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [distance, setDistance] = useState(currentUser?.distance_preference || 0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSavePreferences = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {};

        if (currentPassword) {
            if (!validateCurrentPassword(currentPassword, currentUser.password)) {
                setError("הסיסמה אינה נכונה");
                setLoading(false);
                return;
            }

            if (newEmail !== currentEmail && newEmail) {
                data.email = newEmail;
            } else if (newEmail === currentEmail) {
                setError("האימייל שהוזן זהה לאימייל הנוכחי")
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
            setError("הזן סיסמה נוכחית!");
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
            const res = await updateUserToServer(currentUser.email, data);
            if (res === 200) {
                updateCurrentUser(data);
                setError("");
                if (data.email) {
                    setCurrentEmail(data.email);
                    setNewEmail('');
                }
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setError("הפרטים עודכנו בהצלחה")
            } else {
                setError("העדכון נכשל, נסה שוב");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Toolbar onLogout={logout}/>
            <StyledContainer>
                <StyledContentBox>
                    <Form title="הגדרות" func={handleSavePreferences} icon={SettingsIcon}>
                        <StyledGridItem>
                            <StyledGridItem>
                                <AuthTextField
                                    label="מייל נוכחי"
                                    value={currentEmail}
                                    onChange={() => {
                                    }}
                                    disabled
                                />
                            </StyledGridItem>
                            <StyledGridItem>
                                <AuthTextField
                                    label="מייל חדש"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                />
                            </StyledGridItem>
                            <StyledGridItem>
                                <AuthTextField
                                    label="סיסמה נוכחית"
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                            </StyledGridItem>
                            <StyledGridItem>
                                <AuthTextField
                                    label="סיסמה חדשה"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </StyledGridItem>
                            <StyledGridItem>
                                <AuthTextField
                                    label="אימות סיסמה חדשה"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </StyledGridItem>
                            <StyledGridItem>
                                <StyledSliderTitle>
                                    העדפת מרחק (1-20 ק"מ)
                                </StyledSliderTitle>
                                <StyledSliderBox>
                                    <CustomMarks
                                        value={distance}
                                        onChange={(newValue) => setDistance(newValue)}
                                        aria-labelledby="distance-slider"
                                        min={1}
                                        max={20}
                                        valueLabelDisplay="auto"
                                    />
                                </StyledSliderBox>
                            </StyledGridItem>
                            {error && (
                                <StyledGridItem>
                                    <ErrorTypography>
                                        {error}
                                    </ErrorTypography>
                                </StyledGridItem>
                            )}
                        </StyledGridItem>
                        <StyledButtonBox>
                            <AuthButton
                                loading={loading}
                                color="primary"
                                text="שמירה"
                                onClick={handleSavePreferences}
                            />
                        </StyledButtonBox>
                    </Form>
                </StyledContentBox>
            </StyledContainer>
        </div>
    );
};
