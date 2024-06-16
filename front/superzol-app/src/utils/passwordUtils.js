export const validatePassword = (password, confirmPassword) => {
    const errors = [];

    if (password.length < 6) {
        errors.push("Passwords must contain at least 6 characters");
    }

    if (password !== confirmPassword) {
        errors.push("Passwords do not match");
    }

    return errors;
};
