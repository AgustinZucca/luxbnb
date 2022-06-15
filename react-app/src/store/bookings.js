const LOAD_BOOKINGS = "booking/LOAD_BOOKINGS";
const CREATE_BOOKING = "booking/CREATE_BOOKING";
const DELETE_BOOKING = "booking/DELETE_BOOKING";

// Action Creators
const loadBookings = (bookings) => ({
  type: LOAD_BOOKINGS,
  bookings: bookings,
});

const createBooking = (booking) => ({
  type: CREATE_BOOKING,
  booking: booking,
});

const deleteBooking = (bookingId) => ({
  type: DELETE_BOOKING,
  bookingId: bookingId,
});

export const loadUserBookingsThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/bookings/user/${userId}`);

  if (res.ok) {
    const bookings = await res.json();
    dispatch(loadBookings(bookings));
  }
};

export const addNewBookingThunk =
  (user_id, spot_id, check_in, check_out) => async (dispatch) => {
    const res = await fetch(`/api/bookings/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        spot_id,
        check_in,
        check_out,
      }),
    });

    if (res.ok) {
      const bookingInfo = await res.json();
      dispatch(createBooking(bookingInfo));
      return ["Created", bookingInfo];
    }
  };


export const deleteBookingThunk = (booking_id) => async (dispatch) => {
    const res = await fetch(`/api/bookings/${booking_id}`, {
      method: "DELETE",
      body: JSON.stringify({ booking_id }),
    });
  
    if (res.ok) {
      dispatch(deleteBooking(booking_id));
    }
  };
  
  const initialState = { bookings: null };
  
  const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_BOOKINGS:
        const allBookings = {};
  
        for (let booking of action.bookings.bookings) {
          allBookings[booking.id] = booking;
        }
        return { ...allBookings };
  
      case CREATE_BOOKING:
        return {
          ...state,
          [action.booking.id]: action.booking,
        };
  
      case DELETE_BOOKING:
        const newState = { ...state };
        delete newState[action.bookingId];
        return newState;
  
      default:
        return state;
    }
  };
  
  export default bookingsReducer;