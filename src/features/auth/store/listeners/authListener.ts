import { onAuthStateChanged, Unsubscribe } from 'firebase/auth';
import { FirebaseAuth } from '@/firebase/config';
import { login, logout } from '../slices/auth.slice';
import { AppDispatch } from '@/store';

/**
 * Inicia un listener que sincroniza el estado de Firebase Auth con Redux
 * Retorna la función de unsubscribe para limpiar el listener
 */
export const startAuthListener = (dispatch: AppDispatch): Unsubscribe => {
    return onAuthStateChanged(FirebaseAuth, (user) => {
        if (user) {
            dispatch(login({
                uid: user.uid,
                email: user.email || '',
                displayName: user.displayName || '',
                photoURL: user.photoURL || '',
            }));
        } else {
            dispatch(logout());
        }
    });
};

