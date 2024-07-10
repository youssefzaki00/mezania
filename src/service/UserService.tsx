// src/services/userService.js
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase";

export const saveUserData = async (user: any) => {
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, user);
};

export const getUserData = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data() : undefined;
};
