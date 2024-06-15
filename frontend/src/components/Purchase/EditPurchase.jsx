import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useModal } from "../../context/Modal";
import { thunkEditPurchase } from "../../store/userPurchasesReducer";

const EditPurchase = ({ purchase }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const currentUser = useSelector((state) => state.session.user);

  const [firstName, setFirstName] = useState(purchase?.firstName);
  const [lastName, setLastName] = useState(purchase?.lastName);
  const [deliveryAddress, setDeliveryAddress] = useState(
    purchase?.deliveryAddress
  );
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

    const editPurchaseInformation = {
      id: purchase.id,
      userId: purchase.userId,
      vehicleId: purchase.vehicleId,
      firstName: firstName,
      lastName: lastName,
      deliveryAddress: deliveryAddress,
      finalized: 0,
    };

    dispatch(thunkEditPurchase(editPurchaseInformation));

    closeModal();
  };

  return (
    <div className="edit-purchase-modal-container">
      <h3>Purchase Vehicle Form</h3>
      {currentUser ? (
        <div>
          <form className="edit-purchase-modal-form" onSubmit={handleSubmit}>
            <label className="edit-purchase-modal-form-input">
              First Name
              <input
                id="first-name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              {submitted && errors.firstName && (
                <p className="errors">{errors.firstName}</p>
              )}
            </label>
            <label className="edit-purchase-modal-form-input">
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
            <label className="edit-purchase-modal-form-input">
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

            <button className="edit-purchase-modal-button">
              Edit Information
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default EditPurchase;
