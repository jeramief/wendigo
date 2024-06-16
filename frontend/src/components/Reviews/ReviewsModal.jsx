import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { thunkAddReview, thunkLoadReviews } from "../../store/reviewsReducer";
import ReviewCard from "./ReviewCard";
import "./Reviews.css";

const ReviewsModal = ({ car }) => {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});

  const currentUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => Object.values(state.reviewsState));

  useEffect(() => {
    dispatch(thunkLoadReviews())
      .then(() => setIsLoaded(true))
      .catch((errors) => {
        console.log({ errors });
      });
  }, [dispatch]);

  useEffect(() => {
    const errorsObject = {};

    if (comment.length < 4 || comment.length > 100) {
      errorsObject.comment = "Comment must be between 4 and 100 characters";
    }

    setErrors(errorsObject);
  }, [comment]);

  const addReview = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (Object.values(errors).length) return;

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
    <div className="review-modal">
      {isLoaded &&
        currentUser &&
        !reviews.filter(
          (review) =>
            review.userId == currentUser.id && review.vehicleId === car.id
        ).length && (
          <div className="review-modal-leave-review-container">
            <form
              className="review-modal-leave-review-form"
              onSubmit={addReview}
            >
              <label>
                {"Leave a Review: "}
                <input
                  type="text"
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Enter text"
                  required
                />
              </label>
              <button
                className="review-modal-leave-review-submit"
                type="submit"
              >
                Submit Review
              </button>
            </form>
            {submitted && errors.comment && (
              <p className="errors">{errors.comment}</p>
            )}
          </div>
        )}
      <div className="review-modal-list">
        <h2 className="review-modal-list-reviews-heading">Reviews</h2>
        {isLoaded && reviews.length ? (
          reviews.map(
            (review) =>
              review.vehicleId === car.id && (
                <ReviewCard key={review.id} review={review} />
              )
          )
        ) : (
          <h3>No Reviews Currently</h3>
        )}
      </div>
    </div>
  );
};

export default ReviewsModal;
