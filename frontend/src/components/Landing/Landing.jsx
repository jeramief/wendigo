import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";
import { useDispatch } from "react-redux";
import { thunkLoadVehiclesBySearch } from "../../redux/vehiclesReducer";

const Landing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!query.length) {
      navigate("/cars");
    } else {
      Promise.resolve()
        .then(() => dispatch(thunkLoadVehiclesBySearch(query)))
        .then(() => navigate(`/cars?search=${query}`));
    }
  };

  return (
    <section className="landing-page-container">
      <h1 className="landing-page-container-h1">RIGHT CAR. RIGHT PRICE</h1>
      <h4 className="landing-page-container-h4">Your car. Right here.</h4>
      <form className="landing-page-search-container" onSubmit={onSubmit}>
        <input
          className="landing-page-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Make, Model, or Keyword"
        />
        <button className="landing-page-go-button">GO</button>
      </form>
    </section>
  );
};

export default Landing;
