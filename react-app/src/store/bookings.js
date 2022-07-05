const CREATE_BOOKING = "bookings/CREATE_BOOKING";
const GET_BOOKINGS = "bookings/GET_BOOKINGS";
const DELETE_BOOKING = "bookings/DELETE_BOOKING";

const newBooking = (booking) => ({
  type: CREATE_BOOKING,
  payload: booking,
});

const delBooking = (booking) => ({
  type: DELETE_BOOKING,
  payload: booking,
});

const getBookings = (bookings) => ({
    type: GET_BOOKINGS,
    payload: bookings
})

export const getUserBookings = (userId) => async (dispatch) => {
    const response = await fetch(`/api/bookings/${userId}`)
    if (response.ok) {
        const data = await response.json();
        dispatch(getBookings(data));
        return data;
      } else {
        return ["An error occurred. Please try again."];
      }
}

export const createBooking = (booking) => async (dispatch) => {
  const response = await fetch("/api/bookings/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(booking),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(newBooking(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  } else {
    return { errors: ["An error occurred. Please try again."] };
  }
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_BOOKINGS:
        return action.payload
    default:
      return state;
  }
}
