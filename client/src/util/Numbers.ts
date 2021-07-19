export const formatThreeDigitNumber = (value: string | number) => {
    return value.toLocaleString();
};

export const range = (size: number, startAt = 0) => {
    return Array.from({ length: size }, (_, i) => i + startAt);
};
