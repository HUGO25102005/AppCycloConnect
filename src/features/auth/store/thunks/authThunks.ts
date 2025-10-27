import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkingCredentials, logout } from "../slices";
import { authenticateWithGoogle, logoutFirebase } from "@/firebase/providers";

/**
 * Thunk para iniciar sesión con Google
 * Recibe el idToken de expo-auth-session y autentica con Firebase
 */
export const startGoogleSignInThunk = createAsyncThunk(
    'auth/startGoogleSignIn',
    async (idToken: string, { dispatch }) => {
        dispatch(checkingCredentials());
        try {
            const userData = await authenticateWithGoogle(idToken);
            return userData;
        } catch (error) {
            console.error('Error en Google Sign In:', error);
            throw error;
        }
    }
);

export const checkingAuthenticationThunk = createAsyncThunk(
    'auth/checkingAuthentication',
    async (_, { dispatch }) => {
        dispatch(checkingCredentials());
        // try {
        //     // const response = await api.post('/auth/login', { email, password });
        //     // return response.data;
        //     // return fulfillWithValue({ email, password });
        // } catch (error) {
        //     // return rejectWithValue(error);
        // }
    }
);


/**
 * Thunk para cerrar sesión
 * Cierra la sesión de Firebase y limpia el estado de Redux
 */
export const logoutThunk = createAsyncThunk(
    'auth/logout',
    async (_, { dispatch }) => {
        try {
            await logoutFirebase();
            dispatch(logout());
        } catch (error) {
            console.error('Error en logout:', error);
            // Incluso si falla Firebase, limpiamos el estado local
            dispatch(logout());
        }
    }
);