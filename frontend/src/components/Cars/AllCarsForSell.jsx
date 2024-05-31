import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadVehiclesForSell } from "../../redux/vehiclesReducer";

import CarCard from "./CarCard";
import "./Cars.css";

const AllCarsForSell = () => {
  const dispatch = useDispatch();
  const carsObject = useSelector((state) => state.vehiclesState);
  const cars = Object.values(carsObject);

  useEffect(() => {
    dispatch(thunkLoadVehiclesForSell());
  }, [dispatch]);

  return (
    <>
      <main className="cars-for-sell">
        <div className="for-sell-filter-panel"></div>
        <div className="cars-list">
          <div className="for-sell-list-search-container">
            <input
              className="for-sell-list-search"
              type="text"
              placeholder="Search Make, Model, or Keyword"
            />
          </div>
          <div className="cars-list">
            {cars &&
              cars?.map((car) => {
                <h4>Hello World</h4>;
                // <CarCard car={car} />
              })}
          </div>
        </div>
      </main>
    </>
  );
};

export default AllCarsForSell;
