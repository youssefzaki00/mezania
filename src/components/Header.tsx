import { Link, useNavigate } from "react-router-dom";
import logoMain from "../assets/home/logo-main.svg";
import userLogo from "../assets/home/user.svg";
import Button from "./Button";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { ErrorMessage } from "../interface";

function Header() {
  const { user, signout } = useAuth();
  const navigate = useNavigate();

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
  return (
    <header>
      <div className="header__logo">
        <img src={logoMain} alt="logo" />
      </div>
      <div className="header__actions">
        <Button content="add new budget" />
        <div className="user__name">
          <img src={userLogo} alt="user logo" />
          {user ? (
            <button className="SignOutButton" onClick={handleSignOut}>
              Sign Out
            </button>
          ) : (
            <Link className="SignUpButton " to="/welcome/signup">
              SignUp
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
