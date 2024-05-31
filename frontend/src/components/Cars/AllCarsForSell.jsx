import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadVehiclesForSell } from "../../redux/vehiclesReducer";

import CarCard from "./CarCard";
import "./Cars.css";

const AllCarsForSell = () => {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);

  const carsObject = useSelector((state) => state.vehiclesState);
  const cars = Object.values(carsObject);

  useEffect(() => {
    dispatch(thunkLoadVehiclesForSell()).then(() => setIsLoaded(true));
  }, [dispatch]);
  console.log({ cars });

  return (
    <>
      <main className="cars-for-sell">
        <div className="for-sell-filter-panel"></div>
        <div className="cars">
          <div className="for-sell-list-search-container">
            <input
              className="for-sell-list-search"
              type="text"
              placeholder="Search Make, Model, or Keyword"
            />
          </div>
          <div className="cars-list">
            {isLoaded &&
              cars?.map((car) => {
                <div>
                  {console.log(car)}
                  <h4 key={car.id}>{car.model}</h4>;
                </div>;
                // <CarCard car={car} />
              })}
          </div>
        </div>
      </main>
    </>
  );
};

export default AllCarsForSell;
