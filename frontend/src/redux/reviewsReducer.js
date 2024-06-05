const LOAD_REVIEWS = "reviews/loadReviews";
const ADD_REVIEW = "reviews/addReview";
const DELETE_REVIEW = "reviews/deleteReview";

const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews,
});
const addReview = (review) => ({
  type: ADD_REVIEW,
  review,
});
const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

export const thunkLoadReviews = () => async (dispatch) => {
  fetch("/api/reviews")
    .then((response) => response.json())
    .then((data) => dispatch(loadReviews(data)))
    .catch((errors) => {
      console.log({ errors });
      return errors;
    });
};
export const thunkAddReview = (review) => async (dispatch) => {
  fetch("/api/reviews/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: review.userId,
      vehicle_id: review.vehicleId,
      user_name: review.userName,
      vehicle_type: review.vehicleType,
      comment_text: review.commentText,
      user_state: review.userState,
    }),
  })
    .then((response) => response.json())
    .then((data) => dispatch(addReview(data)))
    .catch((errors) => {
      console.log({ errors });
      return errors;
    });
};
export const thunkEditReview = (review) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${review.id}/edit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      // id: review.id,
      user_id: review.userId,
      vehicle_id: review.vehicleId,
      user_name: review.userName,
      vehicle_type: review.vehicleType,
      comment_text: review.commentText,
      user_state: review.userState,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    return dispatch(addReview(data));
  } else {
    const errors = await response.json();
    console.log({ errors });
    return errors;
  }
};
export const thunkDeleteReview = (reviewId) => async (dispatch) => {
  fetch(`/api/reviews/${reviewId}/delete`)
    .then(() => dispatch(deleteReview(reviewId)))
    .catch((errors) => {
      console.log({ errors });
      return errors;
    });
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS: {
      const newState = { ...state };
      action.reviews.forEach((review) => {
        newState[review.id] = review;
      });

      return newState;
    }
    case ADD_REVIEW: {
      const newState = { ...state };
      newState[action.review.id] = action.review;

      return newState;
    }
    case DELETE_REVIEW: {
      const newState = { ...state };
      delete newState[action.reviewId];

      return newState;
    }
    default: {
      return state;
    }
  }
};

export default reviewsReducer;
