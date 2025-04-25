export const randomImage = (width = 1920, height = 1080) => {
    return `https://picsum.photos/${width}/${height}?random=${Math.random()}`;
};

export const randomAvatar = (size = 100) => {
    return `https://i.pravatar.cc/${size}?u=${Math.random()}`;
};