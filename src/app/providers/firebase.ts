import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  signOut as signOutDefault,
} from 'firebase/auth';

export { onAuthStateChanged } from 'firebase/auth';
export const app = initializeApp({
  apiKey: 'AIzaSyAkWHV6KJIAAsmifShVYZlRtGUTC1i7jY8',
  authDomain: 'fe-app-791ce.firebaseapp.com',
  projectId: 'fe-app-791ce',
  storageBucket: 'fe-app-791ce.appspot.com',
  messagingSenderId: '551153131515',
  appId: '1:551153131515:web:d19f0d796e1d722031355e',
  measurementId: 'G-EEQZFYL9E1',
});
export const auth = initializeAuth(app, {
  persistence: browserLocalPersistence,
});
export const signIgn = signInWithEmailAndPassword.bind(null, auth);
export const signOut = signOutDefault.bind(null, auth);

