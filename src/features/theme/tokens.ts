// src/theme/tokens.ts

// Paleta de colores morados del proyecto
const COLORS = {
    purpleLight: '#3A015C',
    purpleMedium: '#4F0147',
    purpleDark: '#35012C',
    purpleDarker: '#290025',
    purpleDarkest: '#11001C',
};

export const spacing = (n: number) => n * 4;
export const radius = { sm: 6, md: 10, lg: 16 };
export const typography = { body: 16, title: 20 };

export const lightColors = {
    bg: '#ffffff',
    text: '#1f2937',
    primary: COLORS.purpleLight, // #3A015C - morado principal para botones
    secondary: COLORS.purpleMedium, // #4F0147 - morado secundario
    accent: COLORS.purpleDark, // #35012C - acentos
    card: '#f8fafc',
    border: '#e5e7eb',
    error: '#e74c3c',
    success: '#27ae60',
};

export const darkColors = {
    bg: '#121212', // Fondo oscuro tradicional del sistema
    text: '#e5e7eb',
    primary: COLORS.purpleLight, // #3A015C - morado principal más claro como acento
    secondary: COLORS.purpleMedium, // #4F0147
    accent: COLORS.purpleDark, // #35012C
    card: COLORS.purpleDarker, // #290025 - cards con morado oscuro
    border: COLORS.purpleDarkest, // #11001C - bordes muy oscuros
    error: '#e74c3c',
    success: '#27ae60',
};