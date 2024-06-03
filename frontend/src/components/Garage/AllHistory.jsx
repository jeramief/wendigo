import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useModal } from "../../context/Modal";
import OpenModalMenuItem from "../OpenModalButton/";
import { CancelPurchase, EditPurchase } from "../Purchase";
import { thunkLoadUserPurchases } from "../../redux/userPurchasesReducer";
import { thunkLoadVehiclesForSell } from "../../redux/vehiclesReducer";
import "./Garage.css";

const AllHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);
  const { closeModal } = useModal();
  const currentUser = useSelector((state) => state.session.user);
  const allHistoryObjects = useSelector((state) => state.userPurchasesState);
  const allHistory = Object.values(allHistoryObjects);
  const vehicles = useSelector((state) => state.vehiclesState);

  useEffect(() => {
    dispatch(thunkLoadUserPurchases())
      .then(() => dispatch(thunkLoadVehiclesForSell()))
      .then(() => setIsLoaded(true))
      .catch((error) => console.log(error));
  }, [dispatch]);

  return (
    <div className="all-history">
      <div className="all-history-purchases">
        <h2>Purchase History</h2>
        {isLoaded &&
          allHistory.map((purchase) =>
            purchase.finalized ? null : (
              <div key={purchase.id}>
                <div className="all-history-purchases-details">
                  <span>
                    {`${vehicles[purchase.vehicleId].year} 
                  ${vehicles[purchase.vehicleId].make} 
                  ${vehicles[purchase.vehicleId].model}`}
                  </span>
                  <span>{vehicles[purchase.vehicleId].price}</span>
                </div>
                <div className="all-history-purchases-buttons">
                  <OpenModalMenuItem
                    id="car-details-purchase-button"
                    itemText="Purchase"
                    modalComponent={<EditPurchase />}
                  />
                  <OpenModalMenuItem
                    id="car-details-purchase-button"
                    itemText="Purchase"
                    modalComponent={<CancelPurchase />}
                  />
                </div>
              </div>
            )
          )}
      </div>
      <hr />
      <div className="all-history-sells">
        <h2>Sell History</h2>
        {isLoaded &&
          allHistory.map((purchase) =>
            purchase.finalized ? (
              <div key={purchase.id}>
                <div className="all-history-purchases-details">
                  <span>
                    {`${vehicles[purchase.vehicleId].year} 
                  ${vehicles[purchase.vehicleId].make} 
                  ${vehicles[purchase.vehicleId].model}`}
                  </span>
                  <span>{vehicles[purchase.vehicleId].price}</span>
                </div>
                <div className="all-history-purchases-buttons">
                  <OpenModalMenuItem
                    id="car-details-purchase-button"
                    itemText="Purchase"
                    modalComponent={<EditPurchase />}
                  />
                </div>
              </div>
            ) : null
          )}
      </div>
    </div>
  );
};

export default AllHistory;
