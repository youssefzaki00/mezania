import { Outlet } from "react-router-dom";
import welcomeImage from "../assets/welcome_image.png";

function Welcome() {
  return (
    <div className="welcome">
      <div className="welcome__image">
        <img src={welcomeImage} alt="welcome" />
      </div>
      <Outlet />
    </div>
  );
}
export default Welcome;
