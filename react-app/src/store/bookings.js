const CREATE_BOOKING = "bookings/CREATE_BOOKING";
const DELETE_BOOKING = "bookings/DELETE_BOOKING";

const newBooking = (booking) => ({
  type: CREATE_BOOKING,
  payload: booking,
});

const delBooking = (booking) => ({
  type: DELETE_BOOKING,
  payload: booking,
});

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
    default:
      return state;
  }
}
