export const isNotEmpty = (str) => str.trim().length > 0;

export const isValidName = (str) => /\w+/i.test(str);
