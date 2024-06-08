import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { thunkLoadVehiclesForSell } from "../../redux/vehiclesReducer";
import OpenModalButton from "../OpenModalButton";
import ShowImage from "../ShowImage";
import { Purchase } from "../Purchase";
import ReviewsCarousel from "../Reviews/ReviewsCarousel";

const CarDetails = () => {
  const dispatch = useDispatch();
  const { carId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [price, setPrice] = useState("");
  // const currentUser = useSelector((state) => state.session.user);
  const car = useSelector((state) => state.vehiclesState)[carId];
  // const wishlist = useSelector((state) => state.wishlistState);

  useEffect(() => {
    dispatch(thunkLoadVehiclesForSell())
      .then(() =>
        setPrice(
          Intl.NumberFormat("en-us", {
            style: "currency",
            currency: "USD",
          }).format(car?.price)
        )
      )
      .then(() => setIsLoaded(true));
  }, [dispatch, car?.price]);

  return (
    <div className="car-details-container">
      {isLoaded && (
        <div className="car-details">
          {/* <div className="car-details-wishlist-container">
      <button
        onClick={() => window.alert("Wishlist feature coming soon")}
        className="car-details-wishlist-button"
      >
        Add to Wishlist
      </button>
    </div> */}
          <h2 className="car-details-name">{`${car.year} ${car.make} ${car.model}`}</h2>
          <ShowImage url={car.image} type="car-details" />
          <h3 className="car-details-vehicle-details-title">VEHICLE DETAILS</h3>
          <div className="car-details-detail-container">
            <span className="car-details-detail">MPG: {car.mpg}</span>
            <span className="car-details-detail">
              FUEL: {car.fuel || "Not Available"}
            </span>
            <span className="car-details-detail">COLOR: {car.color}</span>
            <span className="car-details-detail">
              DRIVETRAIN: {car.drivetrain}
            </span>
            <span className="car-details-detail">
              ENGINE: {car.engine || "Not Available"}
            </span>
            <span className="car-details-detail">
              TRANSMISSION: {car.transmission}
            </span>
            <span className="car-details-detail">MILEAGE: {car.mileage}</span>
          </div>
          <div className="car-details-purchase">
            <h3>Price: {price.slice(0, price.length - 3)}</h3>
            <div className="car-details-purchase-container">
              <OpenModalButton
                setClass="car-details-purchase-button"
                buttonText="Purchase"
                modalComponent={<Purchase car={car} />}
              />
            </div>
          </div>
        </div>
      )}
      <ReviewsCarousel car={car} />
    </div>
  );
};

export default CarDetails;
