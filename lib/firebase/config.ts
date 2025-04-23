import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENTID,
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error("Firebase app initialization error", error);
  Alert.alert(
    "Initialization Error",
    "Failed to initialize Firebase services. The app may not work properly.",
  );
  throw error;
}

// Initialize Firebase Auth with persistence
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} catch (authError) {
  console.error("Firebase auth initialization error", authError);
  // Fallback to basic auth without persistence
  auth = getAuth(app);
  Alert.alert(
    "Persistence Warning",
    "Authentication state won't be saved between sessions. Some features may be limited.",
  );
}

// Initialize Firestore
let db;
let todosCollection;
try {
  db = getFirestore(app);
  todosCollection = collection(db, "todos");
} catch (firestoreError) {
  console.error("Firestore initialization error", firestoreError);
  Alert.alert(
    "Database Error",
    "Failed to initialize database. Some features may not work.",
  );
}

export { auth, db, todosCollection };
