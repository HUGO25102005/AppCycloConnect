import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store';

const selectAuthState = (state: RootState) => state.auth;

export const selectIsAuthenticated = createSelector(
    [selectAuthState],
    (auth) => auth.status === 'authenticated'
);

export const selectUserInfo = createSelector(
    [selectAuthState],
    (auth) => ({
        uid: auth.uid,
        email: auth.email,
        displayName: auth.displayName,
        photoURL: auth.photoURL,
    })
);

export const selectAuthStatus = createSelector(
    [selectAuthState],
    (auth) => auth.status
);

export const selectError = createSelector(
    [selectAuthState],
    (auth) => auth.errorMessage
);

