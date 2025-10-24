import * as React from 'react';
import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { Theme } from '../types';
import { darkTheme, lightTheme } from '../themes';
import { selectThemeMode } from '../selectors';

/**
 * Devuelve el Theme efectivo combinando preferencia del usuario (Redux)
 * con el esquema del sistema.
 */
export function useAppTheme(): Theme {
    const systemScheme = useColorScheme(); // 'light' | 'dark' | null
    const pref = useSelector(selectThemeMode);

    const scheme: 'light' | 'dark' =
        pref === 'system' ? (systemScheme ?? 'light') : pref;

    return React.useMemo(() => (scheme === 'dark' ? darkTheme : lightTheme), [scheme]);
}