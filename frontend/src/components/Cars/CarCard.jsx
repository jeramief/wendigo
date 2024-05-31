import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ShowImage from "../ShowImage";

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  const onClick = (vehicleId) => {
    navigate(`/cars/${vehicleId}`);
  };

  return (
    <div className="car-card" onClick={() => onClick(car.id)}>
      <ShowImage
        url={car.image}
        type={"vehicle-card"}
        style={{ width: "100px" }}
      />
      <div className="car-card-content">
        <h4>{`${car.year} ${car.make} ${car.model}`}</h4>
        <h3>{car.price}</h3>
      </div>
    </div>
  );
};

export default CarCard;
