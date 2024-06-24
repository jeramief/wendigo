import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { thunkLoadVehiclesForSell } from "../../store/vehiclesReducer";
import ProfileButton from "./ProfileButton";
import logo from "/images/logo.svg";
import "./Navigation.css";

function Navigation() {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.session.user);

  return (
    <nav className="nav">
      <div className="nav-links-container">
        <NavLink className="nav-links logo-container" to="/">
          <img className="logo" src={logo} alt="Home" />
        </NavLink>
        <NavLink
          className="nav-links"
          to="/cars"
          onClick={() => dispatch(thunkLoadVehiclesForSell())}
        >
          SEARCH
        </NavLink>
        {/* {!currentUser ? (
          <a
            className="nav-links"
            onClick={() => window.alert("Log In to sell your vehicle")}
          >
            SELL
          </a>
        ) : (
          <NavLink className="nav-links" to="/sell-my-car">
            SELL
          </NavLink>
        )} */}
        {currentUser && (
          <NavLink className="nav-links" to="/garage">
            MY GARAGE
          </NavLink>
        )}
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
