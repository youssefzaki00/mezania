import { useCallback, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase/Firebase";
import { Budget } from "../interface";

function useBudget() {
  const context = useContext(UserContext);
  const date = new Date();
  if (context === undefined) {
    throw new Error("useBudget must be used within a UserProvider");
  }

  const { user, setUser, loading } = context;
  const addBudget = useCallback(
    async (title: string, amount: number) => {
      if (!user) {
        toast.error("User is not authenticated");
        return;
      }

      try {
        const newBudget: Budget = {
          id: Date.now(),
          title,
          amount,
          spent: 0,
          remaining: amount,
          expenses: [],
          date: date.toDateString(),
        };

        const updatedBudgets = [...(user.budgets || []), newBudget];

        const updatedUser = { ...user, budgets: updatedBudgets };

        await setDoc(doc(db, "users", user.uid), updatedUser);

        setUser(updatedUser);

        toast.success("Budget added successfully");
      } catch (error) {
        toast.error("Error fetching user data");
      }
    },
    [user]
  );
  const removeBudget = useCallback(
    async (id: Number) => {
      if (!user) {
        toast.error("User is not authenticated");
        return;
      }

      try {
        const updatedBudgets = user.budgets.filter(
          (budget: Budget) => budget.id !== id
        );
        const updatedUser = { ...user, budgets: updatedBudgets };

        await setDoc(doc(db, "users", user.uid), updatedUser);

        setUser(updatedUser);

        toast.success("Budget removed successfully");
      } catch (error) {
        toast.error("Error removing budget");
      }
    },
    [user, setUser]
  );

  return { addBudget, removeBudget, user, loading };
}

export default useBudget;
