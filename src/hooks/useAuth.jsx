import { useContext } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  // sendEmailVerification,
  updateProfile,
  getAuth,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../firebase/Firebase.ts";
import { UserContext } from "../context/UserContext";

const useAuth = () => {
  const { user, setUser, loading } = useContext(UserContext);
  const getUser = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUser(docSnap.data());
    } else {
      toast.error("Something went wrong");
      console.log("No such document!");
    }
  };
  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await getUser(result.user.uid);
      console.log("login after", user);
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
      await setUser(null);
      console.log("signOut", user);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return { user, setUser, loading, login, signup, signout };
};

export default useAuth;
