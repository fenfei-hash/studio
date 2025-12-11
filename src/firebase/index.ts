import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';
import { firebaseConfig } from './config';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

let firebaseApp: FirebaseApp;

function initializeFirebase() {
  if (getApps().length === 0) {
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    firebaseApp = getApp();
  }
  return firebaseApp;
}

export function useFirebaseApp(): FirebaseApp {
  return initializeFirebase();
}

export {
  FirebaseProvider,
  useFirebase,
  useAuth,
  useFirestore,
} from './provider';
