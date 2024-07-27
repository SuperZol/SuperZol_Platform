export const validatePassword = (password, confirmPassword) => {
    if (password.length < 6) {
        return "Password must contain at least 6 characters";
    }

    if (password !== confirmPassword) {
        return "Passwords do not match";
    }

    return true; // No errors
};

export const validateCurrentPassword = (currentPassword, userPassword) => {
    return currentPassword === userPassword;
};

export const validateNewPassword = (currentPassword, newPassword, confirmPassword, data) => {
    if ((newPassword && !confirmPassword) || (!newPassword && confirmPassword)) {
        return "You need to fill new password and also confirm password";
    }
    if (newPassword) {
        if (newPassword === currentPassword) {
            return "New password must be different from the current password!";
        }

        const passwordErrors = validatePassword(newPassword, confirmPassword);
        if (passwordErrors !== true) {
            return passwordErrors; // Return the error message
        }

        data.password = newPassword;
    }

    return true; // No errors
};
