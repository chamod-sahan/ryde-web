export const palette = {
    chalk: {
        base: '#FFFFFF',
        contrast: '#F9FAFB',
        muted: '#F3F4F6',
    },
    slate: {
        base: '#4B5563',    // Gray 600 - Minimum for clear visibility
        dark: '#374151',    // Gray 700 - Standard text
        darker: '#111827',  // Slate 900 - Headings
    },
    midnight: {
        base: '#FFFFFF',      // Background
        dark: '#F9FAFB',      // Surface
        light: '#F3F4F6',     // Hover
        border: '#E5E7EB',    // Border
    },
    royal: {
        base: '#3B82F6',      // Blue 500
        light: '#60A5FA',     // Blue 400
        dark: '#2563EB',      // Blue 600
        glow: 'rgba(59, 130, 246, 0.15)',
    },
    flare: {
        base: '#F43F5E',      // Rose 500
        light: '#FB7185',     // Rose 400
        dark: '#E11D48',      // Rose 600
        glow: 'rgba(244, 63, 94, 0.15)',
    },
    success: {
        base: '#10B981',
        light: '#34D399',
    },
    warning: {
        base: '#F59E0B',
    }
} as const;

export const COLORS = {
    primary: palette.royal.base,
    primaryDark: palette.royal.dark,
    secondary: palette.midnight.light,
    accent: palette.flare.base,
    background: palette.midnight.base,
    surface: palette.midnight.dark,
    text: {
        primary: '#000000',     /* Pure Black */
        secondary: '#111827',   /* Slate 900 */
        light: '#374151',       /* Gray 700 */
    },
    border: palette.midnight.border,
} as const;
