import { useCallback, useContext } from "react";
import { ActiveBudgetContext } from "../context/ActiveBudgetContext";
import { toast } from "react-toastify";
import { Expense } from "../interface";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase";
import { UserContext } from "../context/UserContext";

const useActiveBudget = () => {
  const activeContext = useContext(ActiveBudgetContext);
  if (!activeContext) {
    throw new Error("useActiveBudget must be used within a UserProvider");
  }
  const { activeBudget, setActiveBudget, changeActiveBudget } = activeContext;

  const authContext = useContext(UserContext);
  if (authContext === undefined) {
    throw new Error("useActiveBudget must be used within a UserProvider");
  }
  const { user, setUser, loading } = authContext;

  const date = new Date();

  const addExpense = useCallback(
    async (title: string, amount: number) => {
      if (!user || !activeBudget) {
        toast.error("User is not authenticated");
        return;
      }

      try {
        const newExpense: Expense = {
          id: Date.now(),
          title,
          amount,
          date: date.toDateString(),
        };

        const updatedExpenses = [...(activeBudget.expenses || []), newExpense];
        const updatedBudget = {
          ...activeBudget,
          spent: activeBudget.spent + amount,
          remaining: activeBudget.remaining - amount,
          expenses: updatedExpenses,
        };

        const budgetIndex = user.budgets.findIndex(
          (budget) => budget.id === activeBudget.id
        );

        if (budgetIndex === -1) {
          toast.error("Active budget not found in user budgets");
          return;
        }
        const updatedUserBudgets = [...user.budgets];
        updatedUserBudgets[budgetIndex] = updatedBudget;

        await updateDoc(doc(db, "users", user.uid), {
          budgets: updatedUserBudgets,
        });

        const updatedUser = { ...user, budgets: updatedUserBudgets };

        setUser(updatedUser);
        changeActiveBudget(updatedBudget);

        toast.success("Expense added successfully");
      } catch (error) {
        toast.error("Error adding expense");
      }
    },
    [user, activeBudget, setUser, setActiveBudget, date]
  );

  const removeExpense = useCallback(
    async (expenseId: number) => {
      if (!user || !activeBudget) {
        toast.error("User or budget is not authenticated");
        return;
      }

      try {
        const updatedExpenses = activeBudget.expenses.filter(
          (expense) => expense.id !== expenseId
        );
        const updatedBudget = { ...activeBudget, expenses: updatedExpenses };

        const budgetIndex = user.budgets.findIndex(
          (budget) => budget.id === activeBudget.id
        );

        if (budgetIndex === -1) {
          toast.error("Active budget not found in user budgets");
          return;
        }

        await updateDoc(doc(db, "users", user.uid), {
          [`budgets.${budgetIndex}.expenses`]: updatedExpenses,
        });

        const updatedUser = {
          ...user,
          budgets: user.budgets.map((budget, index) =>
            index === budgetIndex ? updatedBudget : budget
          ),
        };

        setUser(updatedUser);
        setActiveBudget(updatedBudget);

        toast.success("Expense removed successfully");
      } catch (error) {
        toast.error("Error removing expense");
      }
    },
    [user, activeBudget, setUser, setActiveBudget]
  );

  return {
    activeBudget,
    setActiveBudget,
    changeActiveBudget,
    addExpense,
    removeExpense,
  };
};
export default useActiveBudget;
