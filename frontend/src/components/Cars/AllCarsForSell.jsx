import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  thunkLoadVehiclesBySearch,
  thunkLoadVehiclesForSell,
} from "../../store/vehiclesReducer";
import CarCard from "./CarCard";
import "./Cars.css";

const AllCarsForSell = () => {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const carsObject = useSelector((state) => state.vehiclesState);
  const cars = Object.values(carsObject).reverse();
  const search = searchParams.get("search");

  useEffect(() => {
    if (search === null)
      dispatch(thunkLoadVehiclesForSell()).then(() => setIsLoaded(true));
    else
      dispatch(thunkLoadVehiclesBySearch(search)).then(() => setIsLoaded(true));
  }, [dispatch, search]);

  const onClick = (e) => {
    e.preventDefault();
    if (!query.length) {
      setSearchParams({});
      dispatch(thunkLoadVehiclesForSell());
    } else {
      setSearchParams({ search: query });
      dispatch(thunkLoadVehiclesBySearch(query));
    }
    setQuery("");
  };

  return (
    <>
      <main className="cars-for-sell">
        <div className="for-sell-filter-panel"></div>
        <div className="cars">
          <form className="for-sell-list-search-container" onSubmit={onClick}>
            <input
              className="for-sell-list-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Make, Model, or Keyword"
            />
            <button className="for-sell-list-search-button">SEARCH</button>
          </form>
          <div className="cars-list">
            {isLoaded &&
              cars &&
              cars.map((car) => <CarCard key={car.id} car={car} />)}
          </div>
        </div>
      </main>
    </>
  );
};

export default AllCarsForSell;
