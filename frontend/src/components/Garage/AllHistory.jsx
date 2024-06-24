import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import OpenModalButton from "../OpenModalButton/";
import { thunkLoadUserPurchases } from "../../store/userPurchasesReducer";
import { thunkLoadVehiclesForSell } from "../../store/vehiclesReducer";
import { CancelPurchase, EditPurchase, FinalizePurchase } from "../Purchase";
import ShowImage from "../ShowImage";
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
      <div className="all-history-pending-purchases">
        <h2 className="all-history-pending-purchases-title">
          Pending Purchases
        </h2>
        {isLoaded &&
        allHistory.find((purchase) => !purchase.finalized) ? null : (
          <h3 className="empty-purchases">No Pending Purchases</h3>
        )}
        {isLoaded &&
          allHistory.map((purchase) =>
            purchase.finalized ? null : (
              <div
                className="all-history-pending-purchases-card"
                key={purchase.id}
              >
                <div className="all-history-pending-purchases-card-top">
                  <ShowImage
                    url={vehicles[purchase.vehicleId].image}
                    type="all-history-pending-purchases-card"
                  />
                  <div className="all-history-pending-purchases-card-buttons">
                    <OpenModalButton
                      setClass="all-history-pending-purchases-buttons-finalize"
                      buttonText="Finalize"
                      modalComponent={<FinalizePurchase purchase={purchase} />}
                    />
                    <OpenModalButton
                      setClass="all-history-pending-purchases-buttons-edit"
                      buttonText="Edit"
                      modalComponent={<EditPurchase purchase={purchase} />}
                    />
                    <OpenModalButton
                      setClass="all-history-pending-purchases-buttons-cancel"
                      buttonText="Cancel"
                      modalComponent={<CancelPurchase purchase={purchase} />}
                    />
                  </div>
                </div>
                <div className="all-history-pending-purchases-details">
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
                  <span>
                    <b>Deposit: </b>
                    {`$${
                      String(vehicles[purchase.vehicleId].price).length === 6
                        ? String(vehicles[purchase.vehicleId].price).slice(
                            0,
                            3
                          ) +
                          "," +
                          String(vehicles[purchase.vehicleId].price).slice(3)
                        : String(vehicles[purchase.vehicleId].price).length ===
                          5
                        ? String(vehicles[purchase.vehicleId].price).slice(
                            0,
                            2
                          ) +
                          "," +
                          String(vehicles[purchase.vehicleId].price).slice(2)
                        : String(vehicles[purchase.vehicleId].price).length ===
                          4
                        ? String(vehicles[purchase.vehicleId].price).slice(
                            0,
                            1
                          ) +
                          "," +
                          String(vehicles[purchase.vehicleId].price).slice(1)
                        : vehicles[purchase.vehicleId].price
                    }`}
                  </span>
                </div>
              </div>
            )
          )}
      </div>
      <hr />
      <div className="all-history-delivered-vehicles">
        <h2 className="all-history-delivered-vehicles-title">
          Delivered Vehicles
        </h2>
        {isLoaded &&
        allHistory.find((purchase) => purchase.finalized) ? null : (
          <h3 className="empty-purchases">No Finalized Purchases</h3>
        )}
        {isLoaded &&
          allHistory.map((purchase) =>
            purchase.finalized ? (
              <div
                className="all-history-delivered-vehicles-card"
                key={purchase.id}
              >
                <ShowImage
                  url={vehicles[purchase.vehicleId].image}
                  type="all-history-pending-purchases-card"
                />
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
                    <b>Price: </b>
                  </span>
                  <span>{`$${
                    String(vehicles[purchase.vehicleId].price).length === 6
                      ? String(vehicles[purchase.vehicleId].price).slice(0, 3) +
                        "," +
                        String(vehicles[purchase.vehicleId].price).slice(3)
                      : String(vehicles[purchase.vehicleId].price).length === 5
                      ? String(vehicles[purchase.vehicleId].price).slice(0, 2) +
                        "," +
                        String(vehicles[purchase.vehicleId].price).slice(2)
                      : String(vehicles[purchase.vehicleId].price).length === 4
                      ? String(vehicles[purchase.vehicleId].price).slice(0, 1) +
                        "," +
                        String(vehicles[purchase.vehicleId].price).slice(1)
                      : vehicles[purchase.vehicleId].price
                  }`}</span>
                </div>
              </div>
            ) : null
          )}
      </div>
    </div>
  );
};

export default AllHistory;
