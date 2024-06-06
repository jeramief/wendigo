import { useNavigate } from "react-router-dom";

import ShowImage from "../ShowImage";

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  const onClick = (vehicleId) => {
    navigate(`/cars/${vehicleId}`);
  };

  return (
    <div className="car-card" onClick={() => onClick(car.id)}>
      <ShowImage url={car.image} type={"vehicle-card"} />
      <div className="car-card-content">
        <div>
          <p className="car-card-text">{`${car.year} ${car.make} ${car.model}`}</p>
          <p className="car-card-text">Mileage: {car.mileage}</p>
        </div>
        <h3 className="car-card-text car-card-price">Price: ${car.price}</h3>
      </div>
    </div>
  );
};

export default CarCard;
