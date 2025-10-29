// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// @ts-ignore - getReactNativePersistence is available in firebase/auth for React Native
import { getReactNativePersistence } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBEgUqxsgjw8Lpw65y806pUS0Bn1vUrFOc",
    authDomain: "cycloconnect.firebaseapp.com",
    projectId: "cycloconnect",
    storageBucket: "cycloconnect.firebasestorage.app",
    messagingSenderId: "536101435592",
    appId: "1:536101435592:web:fc7d9953b0565047b74dfd"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence for React Native
export const FirebaseAuth = initializeAuth(FirebaseApp, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export const FirebaseDB = getFirestore(FirebaseApp);