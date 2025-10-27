import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { useGoogleAuth } from '@/firebase/googleAuthProvider';
import { startGoogleSignInThunk } from '../store/thunks';

/**
 * Hook que combina expo-auth-session con Redux thunks
 * Maneja el flujo completo de autenticación con Google
 */
export const useGoogleSignIn = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { request, response, promptAsync } = useGoogleAuth();

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            dispatch(startGoogleSignInThunk(id_token));
        } else if (response?.type === 'error') {
            console.error('Error en Google Auth:', response.error);
        }
    }, [response, dispatch]);

    return {
        promptGoogleSignIn: promptAsync,
        isReady: !!request,
    };
};

