import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { thunkLoadVehiclesForSell } from "../../redux/vehiclesReducer";
import OpenModalButton from "../OpenModalButton";
import ReviewsModal from "../Reviews/ReviewsModal";
import ShowImage from "../ShowImage";
import { Purchase } from "../Purchase";

const CarDetails = () => {
  const dispatch = useDispatch();
  const { carId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  // const currentUser = useSelector((state) => state.session.user);
  const car = useSelector((state) => state.vehiclesState)[carId];
  // const wishlist = useSelector((state) => state.wishlistState);

  useEffect(() => {
    dispatch(thunkLoadVehiclesForSell()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="car-details-container">
      {isLoaded && (
        <div className="car-details-links">
          <div className="car-details-description">
            <h2 className="car-details-name">{`${car.year} ${car.make} ${car.model}`}</h2>
            <h3 className="car-details-mileage">{car.mileage}</h3>
          </div>
          <div className="car-details-and-reviews-buttons">
            <button>VEHICLE DETAILS</button>
            <OpenModalButton
              id="car-details-container-reviews-button"
              buttonText="Reviews"
              modalComponent={<ReviewsModal car={car} />}
            />
          </div>
          <div className="car-details-purchase-container">
            <OpenModalButton
              id="car-details-purchase-button"
              buttonText="Purchase"
              modalComponent={<Purchase car={car} />}
            />
          </div>
          <div className="car-details-wishlist-container">
            <button className="car-details-wishlist-button">Wishlist</button>
          </div>
        </div>
      )}
      <ShowImage url={car?.image} type="car-detail" style={{ width: "100%" }} />
      {isLoaded && (
        <div className="car-details-details-container">
          <h3>VEHICLE DETAILS</h3>
          <div className="car-details-list">
            <div className="car-details-detail">
              <h4>MPG</h4>
              <span>{car.mpg}</span>
            </div>
            <div className="car-details-detail">
              <h4>FUEL</h4>
              <span>{car.fuel || "Not Available"}</span>
            </div>
            <div className="car-details-detail">
              <h4>COLOR</h4>
              <span>{car.color}</span>
            </div>
            <div className="car-details-detail">
              <h4>DRIVETRAIN</h4>
              <span>{car.drivetrain}</span>
            </div>
            <div className="car-details-detail">
              <h4>ENGINE</h4>
              <span>{car.engine || "Not Available"}</span>
            </div>
            <div className="car-details-detail">
              <h4>TRANSMISSION</h4>
              <span>{car.transmission}</span>
            </div>
          </div>
        </div>
      )}
      {car && (
        <div className="car-details-review-carousel">
          <div className="car-details-review-carousel-reveiws-container">
            <button className="car-details-review-carousel-left-arrow">
              left
            </button>
            <div
              style={{ background: "yellow", width: "500px", height: "100px" }}
              className="car-details-review-carousel-reviews"
            ></div>
            <button className="car-details-review-carousel-right-arrow">
              right
            </button>
          </div>
          <div className="car-details-review-carousel-review-buttons-container">
            <button>SEE ALL # REVIEWS</button>
            <button>CREATE REVIEW</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
