import React, { useEffect } from "react";
import Header from "../components/Header";
import Content from "./Content";
import { useNavigate } from "react-router-dom";
import Loading from "./../loading/Loading";
import useAuth from "./../hooks/useAuth";
import AllBudgets from "./AllBudgets";

function Home() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/welcome/signup");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="home">
      <Header />
      <AllBudgets />
      <Content />
    </div>
  );
}

export default Home;
