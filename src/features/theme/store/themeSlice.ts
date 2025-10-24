import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { preference, ThemeState } from "../types";



const initialState: ThemeState = {
    mode: 'system',
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setPreference: (state, action: PayloadAction<preference>) => {
            state.mode = action.payload;
        },
    },
});

export const { setPreference } = themeSlice.actions;
export default themeSlice.reducer;