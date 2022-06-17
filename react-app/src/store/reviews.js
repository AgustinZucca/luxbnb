const CREATE_REVIEW = "reviews/CREATE_REVIEW";
const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";

const newReview = (review) => ({
  type: CREATE_REVIEW,
  payload: review,
});

const getReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  payload: reviews,
});

export const allReviews = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${spotId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getReviews(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  } else {
    return {'errors': ["Review must have comment"]};
  }
};

export const createReview = (fullReview) => async (dispatch) => {
  const response = await fetch(`/api/reviews/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fullReview),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(newReview(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const updateReview = (reviewId, review) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(newReview(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const deleteReview = (reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}/delete`, {
    method: 'DELETE'
  });
  return response
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case CREATE_REVIEW:
      return { ...state.reviews, [action.payload.id]: action.payload };
    default:
      return state;
  }
}
