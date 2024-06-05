import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeletePurchase } from "../../redux/userPurchasesReducer";

const CancelPurchase = ({ purchase }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const deletePurchase = async (e) => {
    e.preventDefault();

    dispatch(thunkDeletePurchase(purchase.id));
    closeModal();
  };

  return (
    <div>
      <h3>Are you sure you want to cancel this purchase?</h3>
      <button onClick={deletePurchase}>Yes</button>
      <button onClick={closeModal}>No</button>
    </div>
  );
};

export default CancelPurchase;
