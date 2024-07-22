import { useEffect, useState } from "react";
import useActiveBudget from "../hooks/useActiveBudget";
import { animation } from "../functions";
import { toast } from "react-toastify";
import Modal from "../components/Modal";

function Calculation() {
  const { activeBudget, addExpense, removeExpense } = useActiveBudget();
  const [percent, setPercent] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "" || amount.trim() === "") {
      toast.error("Title and amount are required");
      return;
    }

    try {
      await addExpense(title, Number(amount));
      setShowForm(false);
      setTitle("");
      setAmount("");
    } catch (error) {
      toast.error("Error adding budget");
    }
  };
  useEffect(() => {
    if (activeBudget) {
      const res = Math.round((activeBudget.spent / activeBudget.amount) * 100);
      setPercent(res);
    }
  }, [activeBudget]);

  useEffect(() => {
    animation(percent);
  }, [percent]);
  return (
    <section className="calculation">
      <h3>{activeBudget?.title || "No Budget"}</h3>
      <div className="box__value">
        <p>Income</p>
        <p>£{Number(activeBudget?.amount).toLocaleString() || 0}</p>
      </div>
      <div className="center">
        <div className="progress">
          <svg
            className="progress-bar"
            data-degree={percent.toString()}
            width="300"
            height="300"
          >
            <circle className="progress-circle" cx="150" cy="150" r="135" />
            <circle className="progress-circle" cx="150" cy="150" r="135" />
          </svg>
          <p className="text">{percent}%</p>
          <h4>Spent</h4>
        </div>
      </div>
      <div className="boxes__values">
        <div className="box__value">
          <p>Available</p>
          <p>£{Number(activeBudget?.remaining).toLocaleString() || 0}</p>
        </div>
        <div className="box__value">
          <p>Spent</p>
          <p>£{Number(activeBudget?.spent).toLocaleString() || 0}</p>
        </div>
      </div>
      <div className="box__value">
        <h4 className="Expenses__header h4-heading">Expenses</h4>
        <p>£{Number(activeBudget?.spent).toLocaleString() || 0}</p>
      </div>
      {activeBudget && (
        <div className="box__expenses">
          {activeBudget?.expenses.map((expense) => (
            <div className="expense" key={expense?.id}>
              <p className="expense__name">{expense?.title}</p>
              <p className="expense__value">
                £{Number(expense?.amount).toLocaleString()}
              </p>
              <button
                className="remove__button"
                onClick={() => removeExpense(expense.id)}
              >
                <svg
                  width="29"
                  height="28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#prefix__clip0_18_3821)">
                    <path
                      d="M16.973 12.215L14.5 14.688l-2.485-2.473-1.645 1.645 2.485 2.473-2.473 2.474 1.645 1.645 2.473-2.474 2.473 2.474 1.645-1.645-2.473-2.474 2.473-2.473-1.645-1.645zm1.61-7.548L17.417 3.5h-5.834l-1.166 1.167H6.333V7h16.334V4.667h-4.084zM7.5 22.167A2.34 2.34 0 009.833 24.5h9.334a2.34 2.34 0 002.333-2.333v-14h-14v14zM9.833 10.5h9.334v11.667H9.833V10.5z"
                      fill="#F44336"
                    />
                  </g>
                  <defs>
                    <clipPath id="prefix__clip0_18_3821">
                      <path
                        fill="#fff"
                        transform="translate(.5)"
                        d="M0 0h28v28H0z"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
      <button
        className="button h4-heading add__expense"
        type="button"
        onClick={() => setShowForm(true)}
      >
        Add Expense
      </button>
      <Modal show={showForm} onClose={() => setShowForm(false)}>
        <form onSubmit={handleAddExpense} className="budget-form">
          <h2>Add New Expense</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min={1}
          />
          <button id="Modal_button" type="submit">
            Add Expense
          </button>
        </form>
      </Modal>
    </section>
  );
}

export default Calculation;
