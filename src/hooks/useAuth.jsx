// src/hooks/useAuth.ts
import { useContext } from "react";
import { UserContext } from "../context/UserContext.tsx";

const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }

  const { user, loading, login, signup, signout } = context;

  return { user, loading, login, signup, signout };
};

export default useAuth;
