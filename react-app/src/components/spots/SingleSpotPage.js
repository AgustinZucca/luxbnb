import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchSpot } from "../../store/spots";
import { Rating } from "react-simple-star-rating";
import "./spots.css";
import { createReview, deleteReview } from "../../store/reviews";
import EditReview from "../EditReviewModal";
import {
  checkIn,
  dedicatedWorkspace,
  freeTV,
  kitchen,
  newIcon,
  parking,
  secCams,
  washer,
  wifi,
  littleStar,
} from "../Navicons";
import DatePicker from "react-calendar";
import "../css/calendar.css";
import { createBooking } from "../../store/bookings";

const SingleSpot = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spots.spot);
  const { spotId } = useParams();
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [count, setCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currReview, setCurrReview] = useState({});
  const [reviewErr, setReviewErr] = useState();
  const [avgRating, setAvgRating] = useState(0);
  const [date, setDate] = useState(null);
  console.log(date);

  const ratingAvg = async () => {
    let total = 0;
    let times = 0;

    spot?.reviews?.map((review, idx) => {
      total += review.rating;
      times++;
    });
    setAvgRating(total / times);
  };

  const handleBooking = (e) => {
    e.preventDefault();
    const booking = {
      user_id: user.id,
      spot_id: spot.id,
      check_in: date[0].toISOString().split("T")[0],
      check_out: date[1].toISOString().split("T")[0],
      nights: nightsTotal(date[0], date[1])
    };
    dispatch(createBooking(booking));
  };

  useEffect(async () => {
    await dispatch(fetchSpot(spotId));
    setIsLoaded(true);
  }, [count]);

  useEffect(async () => {
    ratingAvg();
  }, [spot]);

  const editSpot = () => {
    history.push(`/spots/${spot?.id}/edit`);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (review === "") {
      setReviewErr(true);
      return;
    }
    const fullReview = {
      user_id: user.id,
      spot_id: spot.id,
      rating: rating,
      review: review,
    };
    const newReview = await dispatch(createReview(fullReview));
    setCount(count + 1);
    console.log(newReview);
    if (newReview.errors) {
      setReviewErr(true);
    } else {
      setRating(0);
      setReview("");
      setReviewErr(false);

      return newReview;
    }
  };

  const priceTotal = (date1, date2) => {
    let oned = 24 * 60 * 60 * 1000;
    const days = Math.ceil((date2 - date1) / oned);

    return (spot?.price * days).toLocaleString('en-US');
  };
  
  const nightsTotal = (date1, date2) => {
    let oned = 24 * 60 * 60 * 1000;
    const days = Math.ceil((date2 - date1) / oned);

    return days - 1;
  };

  const editReview = (review) => {
    setCurrReview(review);
    setEditing(true);
  };

  const removeReview = async (review) => {
    const delt = dispatch(deleteReview(review.id)).then(() =>
      setCount(count + 1)
    );
    return delt;
  };

  if (!isLoaded) {
    return (
      <div className="loadingPage">
        <div>
          <h1 className="loadingMessage">Loading Spot</h1>
        </div>
        <img src="https://hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif"></img>
      </div>
    );
  }

  return (
    <>
      {editing && (
        <EditReview
          currReview={currReview}
          hideModal={() => setEditing(false)}
          setCount={() => setCount(count + 1)}
        />
      )}
      <div className="singleSpotPage">
        <div className="upperSpotPage">
          <h1 className="spotAd">{spot?.name}</h1>
          <div className="upperSpotPagebottom">
            <div>
              {spot?.address}, {spot?.city}, {spot?.state}
              <div>
                Avg. Rating
                <Rating
                  size={20}
                  readonly={true}
                  fillColor="#eb4c60"
                  ratingValue={avgRating}
                  className="avgRatingStars"
                />
              </div>
            </div>
            {spot?.user_id == user?.id && (
              <div className="editSpotButton" onClick={editSpot}>
                Edit
              </div>
            )}
          </div>
        </div>
        <div className="spotPicturesContainer">
          <img
            className="spotPicture"
            src={spot?.images[spot?.images.length - 1]?.url}
          ></img>
        </div>
        <div className="lowerSpotPage">
          <div className="lowerLeftSpotPage">
            <div className="hostInfo">
              <p className="hostUsername">Hosted by {spot?.user.username}</p>
              <div>
                {spot?.beds} beds - {spot?.baths} baths
              </div>
            </div>
            <div className="spotDescription">
              <div>
                <p style={{ fontSize: "20px" }}>Description</p>
              </div>
              {spot?.description}
            </div>
            <div>
              <div>
                <p style={{ fontSize: "20px" }}>What this place offers</p>
              </div>
              <div className="placeOfferingsIconsContainer">
                <div className="placeOfferingsIcons">
                  {dedicatedWorkspace}{" "}
                  <div className="offeringTitles">Dedicated Workspace</div>
                </div>
                <div className="placeOfferingsIcons">
                  {checkIn}{" "}
                  <div className="offeringTitles">
                    Self check-in with smart lock
                  </div>
                </div>
                <div className="placeOfferingsIcons">
                  {secCams}{" "}
                  <div className="offeringTitles">
                    Security cameras on property
                  </div>
                </div>
                <div className="placeOfferingsIcons">
                  {washer} <div className="offeringTitles">Free washer</div>
                </div>
                <div className="placeOfferingsIcons">
                  {freeTV}{" "}
                  <div className="offeringTitles">
                    HDTV with Amazon Prime Video, Fire TV, Netflix, premium
                    cable
                  </div>
                </div>
                <div className="placeOfferingsIcons">
                  {parking}{" "}
                  <div className="offeringTitles">Free parking on premises</div>
                </div>
                <div className="placeOfferingsIcons">
                  {wifi} <div className="offeringTitles">Free Wifi</div>
                </div>
                <div className="placeOfferingsIcons">
                  {kitchen} <div className="offeringTitles">Kitchen</div>
                </div>
              </div>
            </div>
            <p style={{ fontSize: "20px" }}>Reviews</p>
            <div className="spotReviewsContainer">
              {reviewErr && (
                <div className="reviewErr">
                  Review must contain a 250 or less character comment
                </div>
              )}
              <form
                onSubmit={(e) => handleReviewSubmit(e)}
                className="newReviewForm"
              >
                <div className="starRatingArea">
                  <div>Star Rating</div>
                  <Rating
                    fillColor="#eb4c60"
                    transition={true}
                    allowHover={true}
                    size={20}
                    onClick={(rating) => setRating(rating)}
                    ratingValue={rating}
                    className="inputStars"
                  />
                </div>
                <textarea
                  className="reviewInput"
                  placeholder={"Leave your review of this spot"}
                  onChange={(e) => setReview(e.target.value)}
                  value={review}
                />
                <button className="newReviewSubmit">Submit</button>
              </form>
              {spot?.reviews
                .slice(0)
                .reverse()
                .map((review, idx) => (
                  <div className="createdReviews" key={idx}>
                    <div className="reviewContainer">
                      {review.user.username}
                      <div className="userReview">{review.review}</div>
                    </div>
                    <div>
                      <Rating
                        className="reviewStars"
                        size={20}
                        readonly={true}
                        fillColor="#eb4c60"
                        ratingValue={review.rating}
                      />
                      {review.user.id === user?.id && (
                        <div className="reviewsButtons">
                          <div
                            className="editReviewButton"
                            onClick={() => editReview(review)}
                          >
                            Edit
                          </div>
                          <div
                            className="deleteReviewButton"
                            onClick={() => removeReview(review)}
                          >
                            Delete
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="lowerRightSpotPage">
            <div className="bookingContainer">
              <div className="upperBooking">
                <div>${spot?.price} /night</div>
                {avgRating !== 0 && !isNaN(avgRating) && (
                  <div className="smallRating">
                    <div>{avgRating / 20} </div>
                    {littleStar}
                  </div>
                )}
              </div>
              <form onSubmit={handleBooking}>
                <DatePicker
                  onChange={(picked) => setDate(picked)}
                  value={date}
                  view={"month"}
                  showFixedNumberOfWeeks={true}
                  prev2Label={null}
                  next2Label={null}
                  returnValue="range"
                  selectRange={true}
                  tileDisabled={({ date }) => date < new Date()}
                />
                {date ? (
                  <>
                    <div className="total">
                      Total Nights: {nightsTotal(date[0], date[1])}
                    </div>
                    <div className="total">
                      Total before tax: ${priceTotal(date[0], date[1])}
                    </div>
                    <button className="bookingButton">Reserve</button>
                  </>
                ) : (
                  <button disabled={true} className="bookingButtonDisabled">
                    Reserve
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleSpot;
