import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef?.current?.value;

    try {
      await login(email, password);
      toast.success("Logged in successfully!");
      navigate("/"); // Redirect to home or desired page after login
    } catch (error) {
      toast.error(error?.message);
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
