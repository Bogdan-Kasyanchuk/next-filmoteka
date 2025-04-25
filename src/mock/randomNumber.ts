export const randomNumberMax = (max = 999) => {
    return Math.floor(Math.random() * max);
};

export const randomNumberMinMax = (min = 1, max = 999) => {
    return Math.floor(Math.random() * (max - min) + min);
};