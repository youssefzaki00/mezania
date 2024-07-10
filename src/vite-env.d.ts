/// <reference types="vite/client" />

export  interface ImportMetaEnv {
  VITE_FIREBASE_APIKEY: string;
  VITE_FIREBASE_AUTH_DOMAIN: string;
  VITE_FIREBASE_PROJECT_ID: string;
  VITE_FIREBASE_STORAGE_BUCKET: string;
  VITE_FIREBASE_MESSAGE_SENDER_ID: string;
  VITE_FIREBASE_APP_ID: string;
}

export interface ImportMeta {
  env: string;
}
