import { Link, useNavigate } from "react-router-dom";
import logoMain from "../assets/home/logo(1).webp";
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
          <svg
            width="38"
            height="39"
            viewBox="0 0 38 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_8_644)">
              <path
                d="M19.7917 16.3333C19.7917 13.7208 17.6542 11.5833 15.0417 11.5833C12.4292 11.5833 10.2917 13.7208 10.2917 16.3333C10.2917 18.9458 12.4292 21.0833 15.0417 21.0833C17.6542 21.0833 19.7917 18.9458 19.7917 16.3333ZM15.0417 17.9167C14.1709 17.9167 13.4584 17.2042 13.4584 16.3333C13.4584 15.4625 14.1709 14.75 15.0417 14.75C15.9125 14.75 16.625 15.4625 16.625 16.3333C16.625 17.2042 15.9125 17.9167 15.0417 17.9167ZM25.3334 21.0833C27.0909 21.0833 28.5 19.6742 28.5 17.9167C28.5 16.1592 27.0909 14.75 25.3334 14.75C23.5759 14.75 22.1509 16.1592 22.1667 17.9167C22.1667 19.6742 23.5759 21.0833 25.3334 21.0833ZM18.9842 3.6825C10.2442 3.6825 3.15088 10.7758 3.15088 19.5158C3.15088 28.2558 10.2442 35.3492 18.9842 35.3492C27.7242 35.3492 34.8175 28.2558 34.8175 19.5158C34.8175 10.7758 27.7242 3.6825 18.9842 3.6825ZM9.24671 27.6067C10.3234 26.7517 12.8409 25.8492 15.0417 25.8492C15.1525 25.8492 15.2792 25.865 15.4059 25.865C15.7859 24.8517 16.4667 23.8225 17.4642 22.92C16.5775 22.7617 15.7384 22.6667 15.0417 22.6667C12.9834 22.6667 9.67421 23.3792 7.55255 24.9308C6.76088 23.2842 6.31755 21.4475 6.31755 19.5C6.31755 12.5175 12.0017 6.83333 18.9842 6.83333C25.9667 6.83333 31.6509 12.5175 31.6509 19.5C31.6509 21.4 31.2234 23.205 30.4634 24.8358C28.88 23.9017 26.7267 23.4583 25.3334 23.4583C22.9267 23.4583 18.2084 24.7408 18.2084 27.7333V32.135C14.6142 31.9292 11.4159 30.2192 9.24671 27.6067Z"
                fill="#FFFDE7"
              />
            </g>
            <defs>
              <clipPath id="clip0_8_644">
                <rect
                  width="38"
                  height="38"
                  fill="white"
                  transform="translate(0 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
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
