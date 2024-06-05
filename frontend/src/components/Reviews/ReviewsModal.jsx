import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { thunkAddReview, thunkLoadReviews } from "../../redux/reviewsReducer";
import ReviewCard from "./ReviewCard";

const ReviewsModal = ({ car }) => {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);
  const [comment, setComment] = useState("");

  const currentUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => Object.values(state.reviewsState));

  useEffect(() => {
    dispatch(thunkLoadReviews())
      .then(() => setIsLoaded(true))
      .catch((errors) => {
        console.log({ errors });
      });
  }, [dispatch]);

  const addReview = async (e) => {
    e.preventDefault();

    dispatch(
      thunkAddReview({
        userId: currentUser.id,
        userName: `${currentUser.firstName} ${currentUser.lastName.slice(
          0,
          1
        )}`,
        vehicleId: car.id,
        vehicleType: `${car?.year} ${car?.make} ${car?.model}`,
        commentText: comment,
        userState: currentUser.state,
      })
    );
  };

  return (
    <div>
      {isLoaded && (
        <div className="review-modal-leave-review-container">
          <form onSubmit={addReview}>
            <label>
              Leave a Review
              <input
                type="text"
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter text"
                required
              />
            </label>
            <button type="submit">Submit Review</button>
          </form>
        </div>
      )}
      <hr />
      <div className="review-modal-list">
        {isLoaded &&
          reviews.map(
            (review) =>
              review?.vehicleId === car.id && (
                <ReviewCard key={review.id} review={review} />
              )
          )}
      </div>
    </div>
  );
};

export default ReviewsModal;
