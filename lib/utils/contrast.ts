/**
 * Contrast and Color Accessibility Utilities
 * Professional-grade contrast checking for theme colors
 */

export interface HSLColor {
    h: number;
    s: number;
    l: number;
}

export interface RGBColor {
    r: number;
    g: number;
    b: number;
}

/**
 * Convert HSL to RGB
 */
export function hslToRgb(h: number, s: number, l: number): RGBColor {
    s /= 100;
    l /= 100;

    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

    return {
        r: Math.round(255 * f(0)),
        g: Math.round(255 * f(8)),
        b: Math.round(255 * f(4))
    };
}

/**
 * Convert HSL object to RGB
 */
export function hslObjectToRgb(hsl: HSLColor): RGBColor {
    return hslToRgb(hsl.h, hsl.s, hsl.l);
}

/**
 * Convert RGB to hex color string
 */
export function rgbToHex(rgb: RGBColor): string {
    const toHex = (n: number) => n.toString(16).padStart(2, '0');
    return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

/**
 * Convert HSL to hex color string
 */
export function hslToHex(h: number, s: number, l: number): string {
    return rgbToHex(hslToRgb(h, s, l));
}

/**
 * Calculate relative luminance according to WCAG
 * https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
export function getLuminance(r: number, g: number, b: number): number {
    const [rs, gs, bs] = [r, g, b].map(c => {
        const val = c / 255;
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate luminance from HSL color
 */
export function getLuminanceFromHSL(hsl: HSLColor): number {
    const rgb = hslObjectToRgb(hsl);
    return getLuminance(rgb.r, rgb.g, rgb.b);
}

/**
 * Calculate contrast ratio between two colors according to WCAG
 * https://www.w3.org/WAI/GL/wiki/Contrast_ratio
 */
export function getContrastRatio(color1: HSLColor, color2: HSLColor): number {
    const lum1 = getLuminanceFromHSL(color1);
    const lum2 = getLuminanceFromHSL(color2);
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG standard
 * AA: 4.5:1 for normal text, 3:1 for large text
 * AAA: 7:1 for normal text, 4.5:1 for large text
 */
export function meetsWCAG(
    contrastRatio: number,
    level: 'AA' | 'AAA' = 'AA',
    isLargeText = false
): boolean {
    if (level === 'AA') {
        return contrastRatio >= (isLargeText ? 3 : 4.5);
    }
    return contrastRatio >= (isLargeText ? 4.5 : 7);
}

/**
 * Get accessible text color (white or black) for a given background
 */
export function getAccessibleTextColor(backgroundColor: HSLColor): 'white' | 'black' {
    const luminance = getLuminanceFromHSL(backgroundColor);
    // If background is dark (low luminance), use white text
    // If background is light (high luminance), use black text
    return luminance > 0.5 ? 'black' : 'white';
}

/**
 * Check if a text/background combination is accessible
 */
export function isAccessibleCombination(
    textColor: HSLColor,
    backgroundColor: HSLColor,
    level: 'AA' | 'AAA' = 'AA',
    isLargeText = false
): { accessible: boolean; ratio: number; recommendation?: string } {
    const ratio = getContrastRatio(textColor, backgroundColor);
    const accessible = meetsWCAG(ratio, level, isLargeText);

    if (!accessible) {
        const recommendedColor = getAccessibleTextColor(backgroundColor);
        return {
            accessible: false,
            ratio,
            recommendation: `Use ${recommendedColor} text for better contrast (current: ${ratio.toFixed(2)}:1, required: ${level === 'AA' ? (isLargeText ? '3:1' : '4.5:1') : (isLargeText ? '4.5:1' : '7:1')})`
        };
    }

    return { accessible: true, ratio };
}

/**
 * Get a contrast-safe text color for any background
 */
export function getSafeTextColor(backgroundColor: HSLColor): HSLColor {
    const textColor = getAccessibleTextColor(backgroundColor);
    return textColor === 'white'
        ? { h: 0, s: 0, l: 100 }
        : { h: 0, s: 0, l: 0 };
}
