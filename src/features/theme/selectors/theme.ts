import { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";


const themeSelector = (state: RootState) => state.theme;

export const selectThemeMode = createSelector(
    [themeSelector],
    (theme) => theme.mode
);