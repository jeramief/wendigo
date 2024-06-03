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
        <NavLink to="/garage">MY GARAGE</NavLink>
      </li>

      <li>
        <NavLink to="/wishlist">Wishlist</NavLink>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
