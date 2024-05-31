import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/cars">SEARCH</NavLink>
        <NavLink to="/sell-my-car">SELL</NavLink>
        <NavLink to="/wishlist">Wishlist</NavLink>
        <NavLink to="/history">MY GARAGE</NavLink>
      </li>

      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
