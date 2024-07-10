import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
});

export const auth = getAuth(firebaseApp);
export default firebaseApp;
export const db = getFirestore(firebaseApp);
// async function getUsers(db: any) {
//   const usersCol = collection(db, "users");
//   const userSnapshot = await getDocs(usersCol);
//   const usersList = userSnapshot.docs.map((doc) => doc.data());
// }
