import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchSpot } from "../../store/spots";
import { Rating } from "react-simple-star-rating";
import "./spots.css";

const SingleSpot = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spots.spot);
  const { spotId } = useParams();
  const [rating, setRating] = useState(1);

  useEffect(async () => {
    dispatch(fetchSpot(spotId));
  }, [dispatch]);

  const editSpot = () => {
    history.push(`/spots/${spot?.id}/edit`);
  };

  const createReview = () => {};

  return (
    <div className="singleSpotPage">
      <div className="upperSpotPage">
        <h1 className="spotAd">{spot?.name}</h1>
        <div className="upperSpotPagebottom">
          {spot?.address}
          {spot?.user_id == user?.id && (
            <div className="editSpotButton" onClick={editSpot}>
              Edit
            </div>
          )}
        </div>
      </div>
      <div className="spotPicturesContainer">
        <img className="spotPicture" src={spot?.image}></img>
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
          <p style={{ fontSize: "20px" }}>Reviews</p>
          <div className="spotReviewsContainer">
            <form onSubmit={createReview} className="newReviewForm">
              <div className="starRatingArea">
                <div>Star Rating</div>
                <Rating
                  fillColor="#eb4c60"
                  transition={true}
                  allowHover={true}
                  size={20}
                  onClick={(rating) => setRating(rating)}
                  ratingValue={rating}
                />
              </div>
              <textarea
                className="reviewInput"
                placeholder="Leave your review of this spot"
              />
              <button>Submit</button>
            </form>
            {spot?.reviews?.map((review, idx) => (
              <>{review}</>
            ))}
          </div>
        </div>
        <div className="lowerRightSpotPage"></div>
      </div>
    </div>
  );
};

export default SingleSpot;
