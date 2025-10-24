// src/theme/themes.ts
import type { Theme } from './types';
import { spacing, radius, typography, lightColors, darkColors } from './tokens';

export const lightTheme: Theme = {
  scheme: 'light',
  colors: lightColors,
  spacing,
  radius,
  typography,
};

export const darkTheme: Theme = {
  scheme: 'dark',
  colors: darkColors,
  spacing,
  radius,
  typography,
};