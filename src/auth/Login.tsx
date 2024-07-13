import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { ErrorMessage } from "../interface";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/Firebase";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const isErrorMessage = (error: unknown): error is ErrorMessage => {
    return typeof error === "object" && error !== null && "message" in error;
  };

  const handleLogin = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef?.current?.value;

    try {
      await login(email, password);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      if (isErrorMessage(error)) {
        console.error("Error Login : ", error.message);
        toast.error(error?.message);
      } else {
        console.error("Unknown error Login");
      }
    }
  };

  return (
    <form className="welcome__form">
      <Logo title1="Login" title2="Form" />
      <label className="welcome__label" htmlFor="email">
        <input
          ref={emailRef}
          type="email"
          id="email"
          placeholder="Enter your email"
        />
      </label>
      <label className="welcome__label" htmlFor="password">
        <input
          ref={passwordRef}
          type="password"
          id="password"
          placeholder="Enter your password"
        />
      </label>
      <button type="button" onClick={handleLogin}>
        Login
      </button>
      <div className="welcome__switch">
        Don't have an account? <Link to="/welcome/signup">Sign Up</Link>
      </div>
    </form>
  );
}

export default Login;
