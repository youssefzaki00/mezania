export interface ErrorMessage {
  message: string;
}
export interface ButtonProps {
  content: string;
  onClick: () => void;
}

export interface UserContextProps {
  user: User | null;
  setUser: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
}
export interface User {
  uid: string;
  displayName: string;
  email: string;
  budgets: Budget[];
}
export interface Budget {
  id: number;
  title: string;
  amount: number;
  spent: number;
  remaining: number;
  expenses: Expense[];
  date: string;
}
export interface Expense {
  id: number;
  title: string;
  amount: number;
  date: string;
}

export interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export interface titleProps {
  title1: string;
  title2: string;
}
export interface ActiveBudgetContextProps {
  activeBudget: Budget | undefined;
  setActiveBudget: React.Dispatch<React.SetStateAction<Budget | undefined>>;
  changeActiveBudget: (budget: Budget) => void;
}
