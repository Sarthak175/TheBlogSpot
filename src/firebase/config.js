import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDrkkwekiKJJXAtrmNCK-9MozHkPmG03jg",
  authDomain: "githubpro-2a3b0.firebaseapp.com",
  projectId: "githubpro-2a3b0",
  storageBucket: "githubpro-2a3b0.firebasestorage.app",
  messagingSenderId: "733558777655",
  appId: "1:733558777655:web:642f8cde7bf9d042c3dcb2",
  measurementId: "G-Q0E9Q7W2FG"
};

let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error('Firebase initialization error:', error);
}

export const auth = getAuth(app);
export const db = getFirestore(app);

// Enable offline persistence
try {
  if (typeof window !== 'undefined') {
    // Only run in browser environment
  }
} catch (error) {
  console.error('Firebase persistence error:', error);
}

export default app;