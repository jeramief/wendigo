import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteReview } from "../../redux/reviewsReducer";

const DeleteReview = ({ review }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const deleteReview = async (e) => {
    e.preventDefault();

    dispatch(thunkDeleteReview(review.id));
    closeModal();
  };

  return (
    <div>
      <h3>Are you sure you want to cancel this review?</h3>
      <button onClick={deleteReview}>Yes</button>
      <button onClick={closeModal}>No</button>
    </div>
  );
};

export default DeleteReview;
