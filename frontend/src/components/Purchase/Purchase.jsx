import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useModal } from "../../context/Modal";
import { thunkAddPurchase } from "../../redux/userPurchasesReducer";
import "./Purchase.css";

const Purchase = ({ car }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const currentUser = useSelector((state) => state.session.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const errorsObject = {};

    if (firstName.length < 2 || firstName.length > 20) {
      errorsObject.firstName = "First name must be between 2 and 20 characters";
    }
    if (lastName.length < 2 || lastName.length > 20) {
      errorsObject.lastName = "Last name must be between 2 and 20 characters";
    }
    if (deliveryAddress.length < 5 || deliveryAddress.length > 100) {
      errorsObject.deliveryAddress =
        "Address must be between 5 and 100 characters";
    }

    setErrors(errorsObject);
  }, [deliveryAddress, firstName, lastName]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true);
    if (Object.values(errors).length) return;

    const addPurchaseInformation = {
      userId: currentUser.id,
      vehicleId: car.id,
      firstName: firstName,
      lastName: lastName,
      deliveryAddress: deliveryAddress,
      finalized: 0,
    };

    dispatch(thunkAddPurchase(addPurchaseInformation));

    navigate("/garage");
    closeModal();
  };

  return (
    <div className="purchase-modal-container">
      <h3>Purchase Vehicle Form</h3>
      {currentUser ? (
        <form className="purchase-modal-form" onSubmit={handleSubmit}>
          <label className="purchase-modal-form-input">
            First Name
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            {submitted && errors.firstName && (
              <p className="errors">{errors.firstName}</p>
            )}
          </label>
          <label className="purchase-modal-form-input">
            Last Name
            <input
              id="last-name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            {submitted && errors.lastName && (
              <p className="errors">{errors.lastName}</p>
            )}
          </label>
          <label className="purchase-modal-form-input">
            Delivery Address
            <input
              id="delivery-address"
              type="text"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              required
              placeholder="Enter a fake address, this is a demo site."
            />
            {submitted && errors.deliveryAddress && (
              <p className="errors">{errors.deliveryAddress}</p>
            )}
          </label>
          <button className="purchase-modal-button">Purchase</button>
        </form>
      ) : null}
    </div>
  );
};

export default Purchase;
