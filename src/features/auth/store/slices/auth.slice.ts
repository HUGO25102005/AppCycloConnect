import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    currentStep: number;
    isCompleted: boolean;
    userData: any;
    tokenFromSaaf: string | null;
}

const initialAuth: AuthState = {
    currentStep: 0,
    isCompleted: false,
    userData: null,
    tokenFromSaaf: null,
};

const authSlice = createSlice({
    name: 'sliceName',
    initialState: initialAuth,
    reducers: {
        defaultReducer: (state, action: PayloadAction<number>) => {
            state.currentStep = action.payload;
        },
    }
});

export const {
    defaultReducer,
} = authSlice.actions;

export default authSlice.reducer;