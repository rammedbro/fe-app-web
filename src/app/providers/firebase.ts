import 'firebaseui/dist/firebaseui.css';
import * as firebaseui from 'firebaseui';
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  browserLocalPersistence,
  EmailAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

const app = initializeApp({
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

const ui = new firebaseui.auth.AuthUI(auth);
export const start = (el: string) => {
  onAuthStateChanged(auth, user => {
    if (user) {
      (document.getElementById('sign-out') as HTMLButtonElement).onclick = () =>
        signOut(auth)
          .then(() => console.info('Signed in successfully'))
          .catch(err => console.error(err));
    } else {
      document.getElementById('sign-in')!.onclick = () =>
        signInWithEmailAndPassword(
          auth,
          (document.getElementById('sign-in-login') as HTMLInputElement).value,
          (document.getElementById('sign-in-password') as HTMLInputElement).value,
        )
          .then(() => console.info('Signed in successfully'))
          .catch(err => console.error(err));
    }

    (document.getElementById('account-details') as HTMLPreElement).textContent = JSON.stringify(user);
  });

  if (ui.isPendingRedirect()) {
    ui.start(el, {
      signInSuccessUrl: '/',
      signInOptions: [
        EmailAuthProvider.PROVIDER_ID,
        GoogleAuthProvider.PROVIDER_ID,
      ],
      tosUrl: '/help/terms-of-service',
      privacyPolicyUrl: '/help/privacy-policy',
    });
  }
};

