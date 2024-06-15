import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { thunkLoadReviews } from "../../store/reviewsReducer";
import OpenModalButton from "../OpenModalButton";
import ReviewsModal from "./ReviewsModal";

const ReviewsCarousel = ({ car }) => {
  const dispatch = useDispatch();

  const reviews = useSelector((state) =>
    Object.values(state.reviewsState).filter(
      (review) => review.vehicleId === car?.id
    )
  );

  const [isLoaded, setIsLoaded] = useState(false);
  const [reviewPosition, setReviewPosition] = useState(0);

  useEffect(() => {
    dispatch(thunkLoadReviews())
      .then(() => setIsLoaded(true))
      .catch((errors) => {
        console.log({ errors });
      });
  }, [dispatch]);

  const previousReview = () => {
    if (reviews.length === 0) return;
    else if (reviewPosition === 0) {
      setReviewPosition(reviews.length - 1);
    } else if (reviewPosition > 0) {
      setReviewPosition(reviewPosition - 1);
    }
  };

  const nextReview = () => {
    if (reviews.length === 0) {
      return;
    } else if (reviewPosition === reviews.length - 1) {
      setReviewPosition(0);
    } else if (reviewPosition < reviews.length - 1) {
      setReviewPosition(reviewPosition + 1);
    }
  };

  return (
    <div className="review-carousel">
      <OpenModalButton
        setClass="review-button"
        buttonText="Reviews"
        modalComponent={<ReviewsModal car={car} />}
      />
      <div className="review-carousel-reveiws-container">
        <button className="review-carousel-left-arrow" onClick={previousReview}>
          <IoIosArrowBack />
        </button>
        {isLoaded && reviews.length ? (
          <div className="review-carousel-reviews">
            <p>
              <b>{reviews[reviewPosition].userName}</b> from{" "}
              {reviews[reviewPosition].userState}
            </p>

            <p>
              <b>{reviews[reviewPosition].vehicleType}</b>
            </p>
            <p>{reviews[reviewPosition].commentText}</p>
          </div>
        ) : (
          <div className="review-carousel-reviews">
            <h3>No Reviews</h3>
          </div>
        )}
        <button className="review-carousel-right-arrow" onClick={nextReview}>
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default ReviewsCarousel;
