import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    uid: string | null;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    errorMessage: string | null;
}

const initialAuth: AuthState = {
    status: 'not-authenticated',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialAuth,
    reducers: {
        login: (state, action: PayloadAction<{ uid: string, email: string, displayName: string, photoURL: string }>) => {
            state.status = 'authenticated';
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.displayName = action.payload.displayName;
            state.photoURL = action.payload.photoURL;
            state.errorMessage = null;
        },
        logout: (state) => {
            state.status = 'not-authenticated';
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = null;
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        },
    }
});

export const {
    login,
    logout,
    checkingCredentials,
} = authSlice.actions;

export default authSlice.reducer;