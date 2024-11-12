import { useEffect, useState } from "react";
import useAuth from "./../hooks/useAuth";
import useActiveBudget from "../hooks/useActiveBudget";
import useBudget from "./../hooks/useBudget";
import { Budget } from "../interface";
import BudgetComponent from "../components/BudgetComponent";

function Description() {
  const { user } = useAuth();
  const { removeBudget } = useBudget();
  const { activeBudget, changeActiveBudget } = useActiveBudget();
  // const [isClose, setIsClose] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  console.log(activeBudget);

  // const toggleClass = (): void => {
  //   setIsClose(!isClose);
  // };
  useEffect(() => {
    if (
      user?.budgets?.length == 0 ||
      user?.budgets == undefined ||
      !user?.budgets
    ) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [user?.budgets]);
  const handleActiveBudget = (budget: Budget) => {
    changeActiveBudget(budget);
  };
  return (
    <section className="description">
      <div className="description__header">
        <h3>Budgets</h3>
      </div>
      <div className={`empty ${isEmpty ? "" : "close"}`}>
        <p className="empty__text">
          Looks like you haven&apos;t added any
          <span> budgets yet.</span>
        </p>
        <p className="empty__sub">
          No worries, just hit the <span> &apos;Add New budget&apos; </span>
          button to get started
        </p>
        <svg
          width="84"
          height="84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M31.5 77a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM70 77a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
            stroke="#FFFDE7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.5 3.5h14l9.38 46.865a7 7 0 007 5.635H67.9a7 7 0 007-5.635L80.5 21H21"
            stroke="#FFFDE7"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className={`budgets ${isEmpty ? "close" : ""}`}>
        {user?.budgets?.map((budget: Budget) => (
          <BudgetComponent
            budget={budget}
            activeBudget={activeBudget}
            handleActiveBudget={handleActiveBudget}
            removeBudget={removeBudget}
          />
        ))}
      </div>
    </section>
  );
}

export default Description;
