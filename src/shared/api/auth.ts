import { initializeAuth, browserLocalPersistence, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

export const isAuthenticated = ref(false);
const app = initializeApp({
  // It's ok to include Firebase API keys in your code when you use them only with Firebase-related APIs.
  apiKey: 'AIzaSyAkWHV6KJIAAsmifShVYZlRtGUTC1i7jY8',
  authDomain: 'fe-app-791ce.firebaseapp.com',
  projectId: 'fe-app-791ce',
  storageBucket: 'fe-app-791ce.appspot.com',
  messagingSenderId: '551153131515',
  appId: '1:551153131515:web:d19f0d796e1d722031355e',
  measurementId: 'G-EEQZFYL9E1',
});
const auth = initializeAuth(app, {
  persistence: browserLocalPersistence,
});
onAuthStateChanged(auth, async () => {
  isAuthenticated.value = Boolean(auth.currentUser);
});

export const signIn = signInWithEmailAndPassword.bind(null, auth);
export const signOut = async () => {
  await auth.signOut();
  window.location.reload();
};
