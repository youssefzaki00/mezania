import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoMain from "../../public/logo.svg";
import Button from "./Button";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { ErrorMessage } from "../interface";
import useBudget from "../hooks/useBudget";
import Modal from "./Modal";
function Header() {
  const { user, signout } = useAuth();
  const { addBudget } = useBudget();
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const isErrorMessage = (error: unknown): error is ErrorMessage => {
    return typeof error === "object" && error !== null && "message" in error;
  };

  const handleSignOut = async () => {
    try {
      await signout();
      navigate("/welcome/login");
      toast.success("You signed out successfully");
    } catch (error) {
      if (isErrorMessage(error)) {
        console.error("Error signing out: ", error.message);
      } else {
        console.error("Unknown error signing out");
      }
    }
  };

  const handleAddBudget = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "" || amount.trim() === "") {
      toast.error("Title and amount are required");
      return;
    }

    try {
      await addBudget(title, Number(amount));
      setTitle("");
      setAmount("");
      setShowForm(false);
    } catch (error) {
      toast.error("Error adding budget");
    }
  };

  return (
    <header>
      <div className="header__logo">
        <img src={logoMain} alt="logo" />
      </div>
      <div className="header__actions">
        <Button content="Add New Budget" onClick={() => setShowForm(true)} />
        <Modal show={showForm} onClose={() => setShowForm(false)}>
          <form onSubmit={handleAddBudget} className="budget-form">
            <h2>Add New Budget</h2>
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
              Add Budget
            </button>
          </form>
        </Modal>
        <div className="user__name">
          <svg
            width="38"
            height="39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#prefix__prefix__clip0_8_644)">
              <path
                d="M19.792 16.333a4.764 4.764 0 00-4.75-4.75 4.764 4.764 0 00-4.75 4.75 4.764 4.764 0 004.75 4.75 4.764 4.764 0 004.75-4.75zm-4.75 1.584a1.589 1.589 0 01-1.584-1.584c0-.87.713-1.583 1.584-1.583.87 0 1.583.713 1.583 1.583 0 .871-.713 1.584-1.583 1.584zm10.291 3.166a3.156 3.156 0 003.167-3.166 3.156 3.156 0 00-3.167-3.167c-1.757 0-3.182 1.41-3.166 3.167a3.156 3.156 0 003.166 3.166zm-6.349-17.4c-8.74 0-15.833 7.093-15.833 15.833s7.093 15.833 15.833 15.833 15.834-7.093 15.834-15.833S27.724 3.683 18.984 3.683zM9.247 27.607c1.076-.855 3.594-1.758 5.795-1.758.11 0 .237.016.364.016.38-1.013 1.06-2.042 2.058-2.945-.886-.158-1.726-.253-2.422-.253-2.059 0-5.368.712-7.49 2.264A12.483 12.483 0 016.319 19.5c0-6.982 5.684-12.667 12.666-12.667 6.983 0 12.667 5.684 12.667 12.667 0 1.9-.428 3.705-1.188 5.336-1.583-.934-3.736-1.378-5.13-1.378-2.406 0-7.125 1.283-7.125 4.275v4.402a12.563 12.563 0 01-8.961-4.528z"
                fill="#FFFDE7"
              />
            </g>
            <defs>
              <clipPath id="prefix__prefix__clip0_8_644">
                <path
                  fill="#fff"
                  transform="translate(0 .5)"
                  d="M0 0h38v38H0z"
                />
              </clipPath>
            </defs>
          </svg>
          {user ? (
            <>
              <p className="name">Welcome {user.displayName}</p>
              <button className="SignOutButton" onClick={handleSignOut}>
                Sign Out
              </button>
            </>
          ) : (
            <Link className="SignUpButton" to="/welcome/signup">
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
