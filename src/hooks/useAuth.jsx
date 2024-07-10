import { useContext } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  // sendEmailVerification,
  updateProfile,
  getAuth,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/Firebase.ts";
import { UserContext } from "../context/UserContext";

const useAuth = () => {
  const { user, loading } = useContext(UserContext);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const signup = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // await sendEmailVerification(auth.currentUser).catch((err) =>
      //   console.log(err)
      // );
      const profileAuth = getAuth();
      updateProfile(profileAuth.currentUser, {
        displayName: name,
      });
      const newUser = userCredential.user;
      await setDoc(doc(db, "users", newUser.uid), {
        name: newUser?.displayName ? newUser.displayName : name,
        email: newUser.email,
        password,
        uid: newUser.uid,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const signout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return { user, loading, login, signup, signout };
};

export default useAuth;