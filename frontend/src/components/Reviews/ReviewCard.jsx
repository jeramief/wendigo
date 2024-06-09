import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { thunkEditReview } from "../../redux/reviewsReducer";
import OpenModalButton from "../OpenModalButton";
import DeleteReview from "./DeleteReview";
import "./Reviews.css";

const ReviewCard = ({ review }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);

  const [editComment, setEditComment] = useState(false);
  const [updateComment, setUpdateComment] = useState(review.commentText);

  const confirmUpdate = (e) => {
    e.preventDefault();

    const updatedReview = {
      id: review.id,
      userId: review.userId,
      vehicleId: review.vehicleId,
      userName: review.userName,
      commentText: updateComment,
      vehicleType: review.vehicleType,
      userState: review.userState,
    };

    dispatch(thunkEditReview(updatedReview));
    setEditComment(false);
  };

  const cancelUpdate = (e) => {
    e.preventDefault();

    setEditComment(false);
  };

  return (
    <div className="review-card">
      <br />
      <p>{review.userName}</p>
      <p>{review.vehicleType}</p>
      {editComment && review.userId == currentUser.id ? (
        <div className="review-card">
          <form onSubmit={confirmUpdate}>
            <input
              type="text"
              value={updateComment}
              onChange={(e) => setUpdateComment(e.target.value)}
              placeholder="Enter text"
              required
            />
            <button>Update Review</button>
          </form>
          <button onClick={cancelUpdate}>Cancel Change</button>
        </div>
      ) : (
        <p>{review.commentText}</p>
      )}
      {currentUser && review.userId === currentUser.id && (
        <div>
          <button onClick={() => setEditComment(true)}>Edit Review</button>
          <OpenModalButton
            buttonText="Delete Review"
            modalComponent={<DeleteReview review={review} />}
          />
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
