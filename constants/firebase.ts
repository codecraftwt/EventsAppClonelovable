import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-Z-63K0TVMnbYAtKMnbKV45DDPTVHrOE",
    authDomain: "test-app-1b89b.firebaseapp.com",
    projectId: "test-app-1b89b",
    storageBucket: "test-app-1b89b.firebasestorage.app",
    messagingSenderId: "854474821664",
    appId: "1:854474821664:web:706d2bc147932ec132ec45",
    measurementId: "G-E4G46YVD1K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services with proper persistence
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
