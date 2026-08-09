'use client';
import { createTheme } from '@mui/material/styles';

const statusPalette = {
    saved: { main: '#64748b', light: '#f1f5f9', dark: '#334155', contrastText: '#fff' },
    applied: { main: '#3b82f6', light: '#dbeafe', dark: '#1e40af', contrastText: '#fff' },
    screening: { main: '#06b6d4', light: '#cffafe', dark: '#155e75', contrastText: '#fff' },
    interviewing: { main: '#f59e0b', light: '#fef3c7', dark: '#92400e', contrastText: '#fff' },
    offer: { main: '#8b5cf6', light: '#ede9fe', dark: '#5b21b6', contrastText: '#fff' },
    accepted: { main: '#10b981', light: '#d1fae5', dark: '#065f46', contrastText: '#fff' },
    declined: { main: '#f97316', light: '#ffedd5', dark: '#9a3412', contrastText: '#fff' },
    rejected: { main: '#ef4444', light: '#fee2e2', dark: '#991b1b', contrastText: '#fff' },
    withdrawn: { main: '#78716c', light: '#f5f5f4', dark: '#44403c', contrastText: '#fff' },
    ghosted: { main: '#a1a1aa', light: '#f4f4f5', dark: '#52525b', contrastText: '#fff' },
};

const theme = createTheme({
    typography: {
        fontFamily: 'var(--font-roboto)',
    },
    palette: { ...statusPalette }
});

export default theme;
