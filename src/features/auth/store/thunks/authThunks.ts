import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginFormData } from "../../types";
import { checkingCredentials, logout } from "../slices";

export const startGoogleSignInThunk = createAsyncThunk(
    'auth/startGoogleSignIn',
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


export const logoutThunk = createAsyncThunk(
    'auth/logout',
    async (_, { dispatch }) => {
        dispatch(logout());
    }
);