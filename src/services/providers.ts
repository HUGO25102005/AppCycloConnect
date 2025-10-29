import { signInWithCredential, signOut } from "firebase/auth";
import { FirebaseAuth } from "./config";
import { createGoogleCredential } from "./googleAuthProvider";

/**
 * Autentica con Google usando un ID token
 */
export const authenticateWithGoogle = async (idToken: string) => {
    const credential = createGoogleCredential(idToken);
    const result = await signInWithCredential(FirebaseAuth, credential);

    return {
        uid: result.user.uid,
        email: result.user.email || '',
        displayName: result.user.displayName || '',
        photoURL: result.user.photoURL || '',
    };
};

/**
 * Cierra la sesión de Firebase Auth
 */
export const logoutFirebase = async () => {
    await signOut(FirebaseAuth);
};