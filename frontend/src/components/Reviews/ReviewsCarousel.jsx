import { useSelector } from "react-redux";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import OpenModalButton from "../OpenModalButton";
import ReviewsModal from "./ReviewsModal";

const ReviewsCarousel = ({ car }) => {
  const reviews = useSelector((state) => Object.values(state));

  return (
    <div className="review-carousel">
      <OpenModalButton
        setClass="review-button"
        buttonText="Reviews"
        modalComponent={<ReviewsModal car={car} />}
      />
      <div className="review-carousel-reveiws-container">
        <button className="review-carousel-left-arrow">
          <IoIosArrowBack />
        </button>
        <div className="review-carousel-reviews"></div>
        <button className="review-carousel-right-arrow">
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default ReviewsCarousel;
