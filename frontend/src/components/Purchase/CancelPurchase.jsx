import { useDispatch } from "react-redux";

import { useModal } from "../../context/Modal";
import { thunkDeletePurchase } from "../../store/userPurchasesReducer";

const CancelPurchase = ({ purchase }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const deletePurchase = async (e) => {
    e.preventDefault();

    dispatch(thunkDeletePurchase(purchase.id));
    closeModal();
  };

  return (
    <div className="cancel-purchase-container">
      <h3>Are you sure you want to cancel this purchase?</h3>
      <div className="cancel-purchase-buttons-container">
        <button className="cancel-purchase-buttons" onClick={deletePurchase}>
          Yes
        </button>
        <button className="cancel-purchase-buttons" onClick={closeModal}>
          No
        </button>
      </div>
    </div>
  );
};

export default CancelPurchase;
