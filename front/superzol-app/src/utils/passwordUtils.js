export const validatePassword = (password, confirmPassword) => {
    const errors = [];

    if (password.length < 6) {
        errors.push("Password must contain at least 6 characters");
    }

    if (password !== confirmPassword) {
        errors.push("Password do not match");
    }

    return errors;
};
