import React, {
  createContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import {
  onAuthStateChanged,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/Firebase";
import { toast } from "react-toastify";
import { User, UserContextProps } from "../interface";

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getUser = useCallback(async (uid: string) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser(docSnap.data() as User);
      } else {
        toast.error("Something went wrong");
        console.log("No such document!");
      }
    } catch (error) {
      toast.error("Error fetching user data");
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        await getUser(result.user.uid);
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [getUser]
  );

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const profileAuth = getAuth();
        await updateProfile(profileAuth.currentUser!, {
          displayName: name,
        });
        const newUser = userCredential.user;
        await setDoc(doc(db, "users", newUser.uid), {
          uid: newUser.uid,
          displayName: name,
          email: newUser.email,
          budgets: [],
        });
        await getUser(newUser.uid);
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [getUser]
  );

  const signout = useCallback(async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error: any) {
      toast.error(error.message);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await getUser(firebaseUser.uid);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [getUser]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      loading,
      login,
      signup,
      signout,
    }),
    [user, setUser, setLoading, loading, login, signup, signout, getUser]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
