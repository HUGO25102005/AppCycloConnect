import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { startGoogleSignInThunk } from '../thunks';

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
    },
    extraReducers: (builder) => {
        builder
            .addCase(startGoogleSignInThunk.pending, (state) => {
                state.status = 'checking';
                state.errorMessage = null;
            })
            .addCase(startGoogleSignInThunk.fulfilled, (state, action) => {
                state.status = 'authenticated';
                state.uid = action.payload.uid;
                state.email = action.payload.email;
                state.displayName = action.payload.displayName;
                state.photoURL = action.payload.photoURL;
                state.errorMessage = null;
            })
            .addCase(startGoogleSignInThunk.rejected, (state, action) => {
                state.status = 'not-authenticated';
                state.errorMessage = action.error.message || 'Error en Google Sign In';
            });
    }
});

export const {
    login,
    logout,
    checkingCredentials,
} = authSlice.actions;

export default authSlice.reducer;