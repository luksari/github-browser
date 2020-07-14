export const isNotEmpty = (str) => str.trim().length > 0;

export const isValidName = (str) => /^[a-z0-9_\-]+$/.test(str);
