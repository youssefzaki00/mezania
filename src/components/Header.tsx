import { Link, useNavigate } from "react-router-dom";
import logoMain from "../assets/home/logo-main.svg";
import userLogo from "../assets/home/user.svg";
import Button from "./Button";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

function Header() {
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signout();
      navigate("/welcome/login");
      toast.success("You signed out successfully");
    } catch (error) {
      console.error("Error signing out: ", error?.message);
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
              SignOut
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
