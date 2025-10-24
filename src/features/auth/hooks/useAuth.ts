import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store';
import { checkingAuthenticationThunk, logoutThunk, startGoogleSignInThunk } from '../store/thunks';

export const useAuth = () => {

    const dispatch = useDispatch<AppDispatch>();

    const checkingAuthentication = () => {
        dispatch(checkingAuthenticationThunk());
    }
    const googleLogin = () => {
        dispatch(startGoogleSignInThunk());
    }
    const logout = () => {
        dispatch(logoutThunk());
    }

    return {
        checkingAuthentication,
        googleLogin,
        logout,
    }
}
