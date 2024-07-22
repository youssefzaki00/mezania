import { useEffect, useState } from "react";
import useAuth from "./../hooks/useAuth";
function AllBudgets() {
  const { user } = useAuth();
  const [total, setTotal] = useState(0);
  const [spent, setSpent] = useState(0);
  const [remaining, setRemaining] = useState(0);
  useEffect(() => {
    let tempTotal = 0;
    let tempRemaining = 0;
    let tempSpent = 0;
    for (let i = 0; i < user.budgets.length; i++) {
      tempTotal += user.budgets[i].amount;
      tempSpent += user.budgets[i].spent;
      tempRemaining += user.budgets[i].remaining;
    }
    setTotal(tempTotal);
    setSpent(tempSpent);
    setRemaining(tempRemaining);
  }, [user]);
  return (
    <div className="allBudgets__section">
      <div className="allBudgets">
        <p>all Budgets</p>
      </div>
      <div className="budget">
        <p>budgeted</p>
        <p>£{total.toLocaleString()}</p>
      </div>
      <div className="spent">
        <p>spent</p>
        <p>£{spent.toLocaleString()}</p>
      </div>
      <div className="remaining">
        <p>remaining</p>
        <p>£{remaining.toLocaleString()}</p>
      </div>
    </div>
  );
}

export default AllBudgets;
