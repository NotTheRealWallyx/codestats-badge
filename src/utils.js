export function validateTheme(theme) {
    return theme === 'light' || theme === 'dark';
}

export function validateRequest({ username, theme }) {
    if (!username) {
        return { valid: false, status: 400, message: 'Missing ?user=username' };
    }
    if (theme && !validateTheme(theme)) {
        return { valid: false, status: 400, message: 'Invalid theme. Only "light" or "dark" are supported.' };
    }
    return { valid: true };
}
