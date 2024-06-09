import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkEditPurchase } from "../../redux/userPurchasesReducer";

const FinalizePurchase = ({ purchase }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalizePurchase = {
      id: purchase.id,
      userId: purchase.userId,
      vehicleId: purchase.vehicleId,
      firstName: purchase.firstName,
      lastName: purchase.lastName,
      deliveryAddress: purchase.deliveryAddress,
      finalized: true,
    };

    dispatch(thunkEditPurchase(finalizePurchase));

    closeModal();
  };

  return (
    <div>
      <h3>Do You Want To Finalize This Purchase</h3>
      <div className="finalize-purchase-buttons-container">
        <button className="finalize-purchase-buttons" onClick={handleSubmit}>
          Yes
        </button>
        <button className="finalize-purchase-buttons" onClick={closeModal}>
          No
        </button>
      </div>
    </div>
  );
};

export default FinalizePurchase;
