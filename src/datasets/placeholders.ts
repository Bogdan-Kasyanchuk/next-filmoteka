import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';

type PlaceholderKeyType = '2x3' | '1x1' | '16x9';

// next/image inlines the placeholder into the style of every image, so it has to stay tiny:
// only the characters a data URI can't carry are encoded, plus quotes, since the value sits inside url("...")
const createPlaceholder = (
    width: number,
    height: number,
    fontSize: number,
    textY: number
): PlaceholderValue => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ width } ${ height }">` +
        `<rect width="${ width }" height="${ height }" fill="#222"/>` +
        `<text x="${ width / 2 }" y="${ textY }" fill="#fff" font-family="Times New Roman,serif" font-size="${ fontSize }" text-anchor="middle">Loading...</text>` +
        '</svg>';

    return `data:image/svg+xml,${ svg.replace(/[<>#"]/g, char => encodeURIComponent(char)) }`;
};

export const PLACEHOLDERS: Record<PlaceholderKeyType, PlaceholderValue> = {
    '2x3': createPlaceholder(400, 600, 48, 312),
    '1x1': createPlaceholder(150, 150, 18, 80),
    '16x9': createPlaceholder(500, 282, 60, 156)
};