import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserBookings, deleteBooking } from "../store/bookings";
import Vacations from "../images/vacations.png";
import "./css/userbookings.css";
import check_in from "../images/log-in.png";
import check_out from "../images/log-out.png";
import cancel from "../images/remove.png";
import house from "../images/modern-house.png";

const UserBookings = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const bookings = useSelector((state) => state.bookings.bookings);
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [currBooking, setCurrBooking] = useState({});
  console.log(currBooking);

  useEffect(async () => {
    dispatch(getUserBookings(user.id));
    window.scrollTo(0, 0)
    setIsLoaded(true);
  }, [isLoaded]);

  const handleDelBooking = async (bookingId) => {
    setConfirm(false);
    setIsLoaded(false);
    await dispatch(deleteBooking(bookingId)).then(
      dispatch(getUserBookings(user.id))
    );
  };

  const priceTotal = (price, nights) => {
    return (price * nights).toLocaleString("en-US");
  };

  if (!isLoaded) {
    return (
      <div className="loadingPage">
        <div>
          <h1 className="loadingMessage">Loading your bookings</h1>
        </div>
        <img src="https://hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif"></img>
      </div>
    );
  } else {
    return (
      <>
        {confirm && (
          <div className="confirmDelete">
            <div
              className="confirmDltBackground"
              onClick={() => setConfirm(false)}
            ></div>
            <div className="confirmMsg">
              <h2>Cancel Booking</h2>
              <h3 className="fullMsg">
                Are you sure you want to cancel your booking for{" "}
                {currBooking.spot.name} from {currBooking.check_in.slice(0, 16)}{" "}
                to {currBooking.check_out.slice(0, 16)}?
              </h3>
              <div
                className="cancelBtn"
                onClick={() => handleDelBooking(currBooking.id)}
              >
                Cancel Booking
              </div>
            </div>
          </div>
        )}
        {bookings?.length < 1 && (
          <div className="bookingsPageNone">
            <h1>No bookings yet 😢</h1>
            <img src={Vacations} className="noReservations" />
          </div>
        )}
        {bookings?.length >= 1 && (
          <div className="bookingsPage">
            <div className="bookingsTitle">
              <h1>Your Bookings </h1>
              <img src={house} className="modernHouseIcon" />
            </div>

            <div className="bookingsContainer">
              {bookings
                ?.slice(0)
                .reverse()
                .map((booking, idx) => (
                  <div key={idx}>
                    <div className="bookingCard">
                      <div
                        className="bookingImgContainer"
                        onClick={() =>
                          history.push(`/spots/${booking.spot.id}`)
                        }
                      >
                        <img
                          className="bookingImg"
                          src={
                            booking?.spot?.images[
                              booking?.spot?.images.length - 1
                            ]?.url
                          }
                        ></img>
                      </div>
                      <div className="bookingInfo">
                        <div>
                          {booking?.spot.city}, {booking?.spot.state}
                        </div>
                        <div>
                          <div className="spotFeedInfoName">
                            {booking.spot.name}
                          </div>
                        </div>
                        <div className="bookingDatesCard">
                          <div>Check-In</div>
                          <img src={check_in} className="checkInOutIcons"></img>
                          <div>{booking.check_in.slice(0, 16)}</div>
                        </div>
                        <div className="bookingDatesCard1">
                          <div>Check-Out</div>
                          <img
                            src={check_out}
                            className="checkInOutIcons"
                          ></img>
                          <div>{booking.check_out.slice(0, 16)}</div>
                        </div>
                        <div className="lowerBookingCard">
                          <div>
                            <div>${booking.spot.price} /Night</div>
                            <div>Total Nights: {booking.nights}</div>
                            <div>
                              Price before tax: $
                              {priceTotal(booking.spot.price, booking.nights)}
                            </div>
                          </div>
                          <img
                            src={cancel}
                            className="cancelBookingIcon"
                            onClick={() => {
                              setCurrBooking(booking);
                              setConfirm(true);
                              window.scrollTo(0, 0);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </>
    );
  }
};

export default UserBookings;
