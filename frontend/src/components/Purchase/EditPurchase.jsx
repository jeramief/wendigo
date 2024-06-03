import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useModal } from "../../context/Modal";

const EditPurchase = ({ car }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const currentUser = useSelector((state) => state.session.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch();

    navigate("/history/purchases");
    closeModal();
  };

  return (
    <div className="purchase-modal-container">
      <h3>Purchase Vehicle Form</h3>
      {currentUser ? (
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="form-label">
                <label htmlFor="first-name">First Name</label>
                {/* {validations.name && (
              <span className="form-error">{validations.name}</span>
            ) || errors.name && (
              <span className="form-error">{errors.name}</span>
            )} */}
              </div>
              <input
                id="first-name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="form-label">
                <label htmlFor="last-name">Last Name</label>
                {/* {validations.name && (
              <span className="form-error">{validations.name}</span>
            ) || errors.name && (
              <span className="form-error">{errors.name}</span>
            )} */}
              </div>
              <input
                id="last-name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="form-label">
                <label htmlFor="delivery-address">Delivery Address</label>
                {/* {validations.name && (
              <span className="form-error">{validations.name}</span>
            ) || errors.name && (
              <span className="form-error">{errors.name}</span>
            )} */}
              </div>
              <input
                id="delivery-address"
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                required
                placeholder="Enter a fake address, this is a demo site."
              />
            </div>

            <button>Purchase</button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default EditPurchase;
