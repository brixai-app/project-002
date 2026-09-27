// [auto-quarantined uninstalled package "firebase/app"] import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
const initializeApp: any = typeof Proxy !== 'undefined' ? new Proxy((() => null) as any, { get: () => initializeApp, apply: () => null }) : (() => null);
const getApps: any = typeof Proxy !== 'undefined' ? new Proxy((() => null) as any, { get: () => getApps, apply: () => null }) : (() => null);
const getApp: any = typeof Proxy !== 'undefined' ? new Proxy((() => null) as any, { get: () => getApp, apply: () => null }) : (() => null);
const FirebaseApp: any = typeof Proxy !== 'undefined' ? new Proxy((() => null) as any, { get: () => FirebaseApp, apply: () => null }) : (() => null);
// [auto-quarantined uninstalled package "firebase/firestore"] import {
  getFirestore,
  Firestore,
} from 'firebase/firestore';
const getFirestore: any = typeof Proxy !== 'undefined' ? new Proxy((() => null) as any, { get: () => getFirestore, apply: () => null }) : (() => null);
const Firestore: any = typeof Proxy !== 'undefined' ? new Proxy((() => null) as any, { get: () => Firestore, apply: () => null }) : (() => null);
// [auto-quarantined uninstalled package "firebase/auth"] import {
  getAuth,
  Auth,
} from 'firebase/auth';
const getAuth: any = typeof Proxy !== 'undefined' ? new Proxy((() => null) as any, { get: () => getAuth, apply: () => null }) : (() => null);
const Auth: any = typeof Proxy !== 'undefined' ? new Proxy((() => null) as any, { get: () => Auth, apply: () => null }) : (() => null);

type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

const readEnv = (key: string): string => {
  const value = import.meta?.env?.[key] ?? '';
  if (!value) {
    if (import.meta?.env?.MODE === 'production') {
      console.error(`Missing Firebase env var: ${key}`);
    }
  }
  return value;
};

const firebaseConfig: FirebaseConfig = {
  apiKey: readEnv('VITE_FIREBASE_API_KEY'),
  authDomain: readEnv('VITE_FIREBASE_AUTH_DOMAIN'),
  projectId: readEnv('VITE_FIREBASE_PROJECT_ID'),
  storageBucket: readEnv('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: readEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: readEnv('VITE_FIREBASE_APP_ID'),
};

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);

export const firebaseApp = app;
export const firebaseDb = db;
export const firebaseAuth = auth;
export const getFirebaseEnv = (key: string, fallback: string | null = null): string | null => {
  const value = import.meta?.env?.[key] ?? fallback;
  return value ?? null;
};

const firebase = {
  app: firebaseApp,
  db: firebaseDb,
  auth: firebaseAuth,
  getEnv: getFirebaseEnv,
};

export default firebase;