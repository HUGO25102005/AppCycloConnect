export type preference = "light" | "dark" | "system";

export interface ThemeState {
    mode: preference;
}

export type Theme = {
    scheme: 'light' | 'dark';
    colors: {
        bg: string;
        text: string;
        primary: string;
        secondary: string;
        accent: string;
        card: string;
        border: string;
        error: string;
        success: string;
    };
    spacing: (n: number) => number;
    radius: { sm: number; md: number; lg: number };
    typography: { body: number; title: number };
};