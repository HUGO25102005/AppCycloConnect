import { createAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./index";
import { startAuthListener } from "@/features/auth/store/listeners/authListener";

/**
 * Inicializa listeners y servicios de la app
 * Se ejecuta al startup y en configuración del store
 */
export const appStarted = () => (dispatch: AppDispatch) => {
    // Iniciar listener de Firebase Auth
    startAuthListener(dispatch);
};