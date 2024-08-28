export const validatePassword = (password, confirmPassword) => {
    if (password.length < 6) {
        return "סיסמה צריכה להכיל לפחות 6 תווים";
    }

    if (password !== confirmPassword) {
        return "הסיסמאות לא תואמות";
    }

    return true;
};

export const validateCurrentPassword = (currentPassword, userPassword) => {
    return currentPassword === userPassword;
};

export const validateNewPassword = (currentPassword, newPassword, confirmPassword, data) => {
    if ((newPassword && !confirmPassword) || (!newPassword && confirmPassword)) {
        return "יש למלא סיסמה חדשה ולאמת אותה";
    }
    if (newPassword) {
        if (newPassword === currentPassword) {
            return "הסיסמה צריכה להיות שונה מהנוכחית";
        }

        const passwordErrors = validatePassword(newPassword, confirmPassword);
        if (passwordErrors !== true) {
            return passwordErrors;
        }

        data.password = newPassword;
    }

    return true;
};
