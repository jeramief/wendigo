import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteReview } from "../../redux/reviewsReducer";
import "./Reviews.css";

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
      <h3>Are you sure you want to delete this review?</h3>
      <div className="delete-review-buttons-container">
        <button className="delete-review-buttons" onClick={deleteReview}>
          Yes
        </button>
        <button className="delete-review-buttons" onClick={closeModal}>
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteReview;
