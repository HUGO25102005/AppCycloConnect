import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider } from 'firebase/auth';

// Completa la sesión de auth en el navegador
WebBrowser.maybeCompleteAuthSession();

/**
 * Hook para autenticación con Google usando expo-auth-session
 * Retorna el prompt y el estado de la respuesta
 */
export const useGoogleAuth = () => {
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || 'YOUR_WEB_CLIENT_ID',
        iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
        androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    });

    return { request, response, promptAsync };
};

/**
 * Crea un credential de Google Auth Provider a partir de un ID token
 */
export const createGoogleCredential = (idToken: string) => {
    return GoogleAuthProvider.credential(idToken);
};

