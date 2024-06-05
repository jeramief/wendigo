import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import OpenModalButton from "../OpenModalButton/";
import { CancelPurchase, EditPurchase, FinalizePurchase } from "../Purchase";
import { thunkLoadUserPurchases } from "../../redux/userPurchasesReducer";
import { thunkLoadVehiclesForSell } from "../../redux/vehiclesReducer";
import "./Garage.css";

const AllHistory = () => {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);
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
        <h2>Pending Purchases</h2>
        {isLoaded &&
          allHistory.map((purchase) =>
            purchase.finalized ? null : (
              <div key={purchase.id}>
                <div className="all-history-purchases-details">
                  <br />
                  <span>
                    <b>Vehicle: </b>
                  </span>
                  <span>
                    {`${vehicles[purchase.vehicleId].year} 
                      ${vehicles[purchase.vehicleId].make} 
                      ${vehicles[purchase.vehicleId].model}`}
                  </span>
                  <br />
                  <span>
                    <b>Name: </b>
                  </span>
                  <span>{`${purchase.firstName} ${purchase.lastName}`}</span>
                  <br />
                  <span>
                    <b>Delivery Address: </b>
                  </span>
                  <span>{purchase.deliveryAddress}</span>
                  <br />
                  <span>{`$${vehicles[purchase.vehicleId].price}`}</span>
                </div>
                <div className="all-history-purchases-buttons">
                  <OpenModalButton
                    id="all-history-purchases-buttons-edit"
                    buttonText="Edit"
                    modalComponent={<EditPurchase purchase={purchase} />}
                  />
                  <OpenModalButton
                    id="all-history-purchases-buttons-cancel"
                    buttonText="Finalize"
                    modalComponent={<FinalizePurchase purchase={purchase} />}
                  />
                  <OpenModalButton
                    id="all-history-purchases-buttons-finalize"
                    buttonText="Cancel"
                    modalComponent={<CancelPurchase purchase={purchase} />}
                  />
                </div>
              </div>
            )
          )}
      </div>
      <hr />
      <div className="all-history-sells">
        <h2>Delivered Vehicles</h2>
        {isLoaded &&
          allHistory.map((purchase) =>
            purchase.finalized ? (
              <div key={purchase.id}>
                <div className="all-history-purchases-details">
                  <br />
                  <span>
                    <b>Vehicle: </b>
                  </span>{" "}
                  <span>
                    {`${vehicles[purchase.vehicleId].year} 
                  ${vehicles[purchase.vehicleId].make} 
                  ${vehicles[purchase.vehicleId].model}`}
                  </span>
                  <br />
                  <span>
                    <b>Price: </b>
                  </span>
                  <span>{vehicles[purchase.vehicleId].price}</span>
                </div>
              </div>
            ) : null
          )}
      </div>
    </div>
  );
};

export default AllHistory;
