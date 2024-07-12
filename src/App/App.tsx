import { Route, Routes } from "react-router-dom";
import Home from "../sections/Home";
import Welcome from "../auth/Welcome";
import Signup from "../auth/Signup";
import Login from "../auth/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />}>
          <Route path="/welcome/signup" element={<Signup />} />
          <Route path="/welcome/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
