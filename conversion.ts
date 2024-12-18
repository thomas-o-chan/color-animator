export function hslToRgb(hsl: string): [number, number, number] {
    const hslRegex = /hsl\(\s*(\d+),\s*(\d+)%,\s*(\d+)%\)/;
    const result = hsl.match(hslRegex);

    if (!result) {
        throw new Error('Invalid HSL string');
    }

    let [_, h, s, l] = result.map(Number);
    h /= 360;
    s /= 100;
    l /= 100;

    let r: number, g: number, b: number;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r *
    255), Math.round(g * 255), Math.round(b * 255)];
}


export function hexToRgb(hex: string): [number, number, number] {
    if (hex.startsWith('#')) {
        hex = hex.slice(1);
    }

    if (hex.length !== 6) {
        throw new Error('Invalid hex color');
    }

    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return [r, g, b];
}