import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const realtimeDb = getDatabase(app);

// Configure CORS for Firebase Storage
const corsConfig = {
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 3600
};

// Apply CORS configuration to storage
storage._customUrlBuilder = (bucket: string, path: string) => {
  const url = `https://${bucket}.storage.googleapis.com/${path}`;
  const corsHeaders = new Headers();
  corsHeaders.append('Access-Control-Allow-Origin', corsConfig.origin.join(', '));
  corsHeaders.append('Access-Control-Allow-Methods', corsConfig.methods.join(', '));
  corsHeaders.append('Access-Control-Allow-Headers', corsConfig.allowedHeaders.join(', '));
  corsHeaders.append('Access-Control-Max-Age', corsConfig.maxAge.toString());
  return { url, headers: corsHeaders };
};