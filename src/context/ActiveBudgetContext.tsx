import React, {
  createContext,
  useMemo,
  useState,
  useContext,
  useEffect,
} from "react";
import useBudget from "../hooks/useBudget";
import { ActiveBudgetContextProps, Budget } from "../interface";

export const ActiveBudgetContext = createContext<
  ActiveBudgetContextProps | undefined
>(undefined);

export const ActiveBudgetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useBudget();
  const [activeBudget, setActiveBudget] = useState<Budget | undefined>(
    user?.budgets[0]
  );

  useEffect(() => {
    setActiveBudget(user?.budgets[0]);
  }, []);
  useEffect(() => {
    if (!activeBudget && user?.budgets?.length > 0) {
      setActiveBudget(user.budgets[0]);
    }
  }, [user]);

  const changeActiveBudget = (budget: Budget) => {
    setActiveBudget(budget);
  };

  const value = useMemo(
    () => ({ activeBudget, setActiveBudget, changeActiveBudget }),
    [activeBudget]
  );

  return (
    <ActiveBudgetContext.Provider value={value}>
      {children}
    </ActiveBudgetContext.Provider>
  );
};
