import { NavLink } from "react-router-dom";

import ProfileButton from "./ProfileButton";
import logo from "/images/logo.svg";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="nav">
      <div className="nav-links-container">
        <NavLink className="nav-links logo-container" to="/">
          <img className="logo" src={logo} alt="Home" />
        </NavLink>
        <NavLink className="nav-links" to="/cars">
          SEARCH
        </NavLink>
        {/* <NavLink className="nav-links" to="/sell-my-car">
          SELL
        </NavLink> */}
        <NavLink className="nav-links" to="/garage">
          MY GARAGE
        </NavLink>
      </div>

      <div className="nav-links-container">
        {/* <NavLink className="nav-links" to="/wishlist">
          Wishlist
        </NavLink> */}
        <ProfileButton />
      </div>
    </nav>
  );
}

export default Navigation;
