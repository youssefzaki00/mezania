import Welcome from "../sections/Welcome";
import Home from "../sections/Home";
import { Route, Routes } from "react-router-dom";
import Signup from "../sections/Signup";
import Login from "../sections/Login";

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
