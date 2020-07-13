export const fulfilledValidator = (str) => str.trim().length > 0;

export const regexValidator = (str) => /\w+/i.test(str);
