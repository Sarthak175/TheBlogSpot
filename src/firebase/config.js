import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDrkkwekiKJJXAtrmNCK-9MozHkPmG03jg",
  authDomain: "githubpro-2a3b0.firebaseapp.com",
  projectId: "githubpro-2a3b0",
  storageBucket: "githubpro-2a3b0.firebasestorage.app",
  messagingSenderId: "733558777655",
  appId: "1:733558777655:web:642f8cde7bf9d042c3dcb2",
  measurementId: "G-Q0E9Q7W2FG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;