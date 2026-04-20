// Modern design tokens – cohesive blue accent, clean surfaces, soft borders.
// Both light and dark themes are supported and share semantic keys.

const primary = '#2563EB';      // blue-600 – main accent
const primaryHover = '#3B82F6'; // blue-500 – interactive highlight
const primaryDeep = '#1E3A8A';  // blue-900 – darker secondary
const accent = '#0EA5E9';       // sky-500 – vibrant accent for icons

export default {
    light: {
        text: '#0F172A',          // slate-900
        mutedText: '#64748B',     // slate-500
        background: '#F8FAFC',    // slate-50 – canvas
        surface: '#FFFFFF',       // pure white card
        surfaceAlt: '#F1F5F9',    // slate-100 – secondary surface
        border: '#E2E8F0',        // slate-200 – subtle dividers
        modal: '#FFFFFF',
        icon: primary,
        button: primary,
        input: '#F1F5F9',         // slate-100
        success: '#10B981',
        danger: '#EF4444',
    },
    dark: {
        text: '#F8FAFC',          // near-white
        mutedText: '#94A3B8',     // slate-400
        background: '#0B1120',    // deep slate navy
        surface: '#111827',       // slate-900
        surfaceAlt: '#1E293B',    // slate-800
        border: '#1F2937',        // slate-800
        modal: '#111827',
        icon: primaryHover,
        button: primary,
        input: '#1E293B',         // slate-800
        success: '#10B981',
        danger: '#F87171',
    },
    shared: {
        text: primary,
        icon: accent,
        primary,
        primaryHover,
        primaryDeep,
        accent,
    },
};
