import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store';
import { checkingAuthenticationThunk, logoutThunk } from '../store/thunks';
import { useGoogleSignIn } from './useGoogleSignIn';

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { promptGoogleSignIn, isReady } = useGoogleSignIn();

    const checkingAuthentication = () => {
        dispatch(checkingAuthenticationThunk());
    };

    const googleSignIn = async () => {
        try {
            await promptGoogleSignIn();
        } catch (error) {
            console.error('Error al iniciar Google Sign In:', error);
        }
    };

    const logout = () => {
        dispatch(logoutThunk());
    };

    return {
        checkingAuthentication,
        googleSignIn,
        isGoogleReady: isReady,
        logout,
    };
};
