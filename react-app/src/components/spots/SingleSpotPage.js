import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchSpot } from "../../store/spots";
import { Rating } from "react-simple-star-rating";
import "./spots.css";
import { createReview, deleteReview } from "../../store/reviews";
import EditReview from "../EditReviewModal";

const SingleSpot = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spots.spot);
  const { spotId } = useParams();
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [count, setCount] = useState(0);
  const [editing, setEditing] = useState(false);
  const [currReview, setCurrReview] = useState({})
  const [avgRating, setAvgRating] = useState()

  const ratingAvg = () => { 
    let total = 0
    let times = 0

    spot?.reviews.map((review, idx) => {
      total += review.rating
      times++
    })

    setAvgRating(total/times)
  };

  useEffect(async () => {
    dispatch(fetchSpot(spotId));
    ratingAvg()
  }, [count]);

  const editSpot = () => {
    history.push(`/spots/${spot?.id}/edit`);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const fullReview = {
      user_id: user.id,
      spot_id: spot.id,
      rating: rating,
      review: review,
    };
    const newReview = await dispatch(createReview(fullReview));
    setCount(count + 1);

    return newReview;
  };

  const editReview = (review) => {
    setCurrReview(review)
    setEditing(true)
  }

  const removeReview = async (review) => {
    const delt = dispatch(deleteReview(review.id)).then(() => setCount(count + 1))
    return delt
  }

  return (
    <>
    {editing && (
      <EditReview currReview={currReview} hideModal={() => setEditing(false)} setCount={() => setCount(count+1)}/>
    )}
    <div className="singleSpotPage">
      <div className="upperSpotPage">
        <h1 className="spotAd">{spot?.name}</h1>
        <div className="upperSpotPagebottom">
          <div>
            {spot?.address}, {spot?.city}, {spot?.state}
            <div>
              Avg. Rating
              <Rating size={20} readonly={true} fillColor="#eb4c60" ratingValue={avgRating}/>
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
            {}
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
                />
              </div>
              <textarea
                className="reviewInput"
                placeholder="Leave your review of this spot"
                onChange={(e) => setReview(e.target.value)}
              />
              <button className="newReviewSubmit">Submit</button>
            </form>
            {spot?.reviews
              .slice(0)
              .reverse()
              .map((review, idx) => (
                <div className="createdReviews">
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
                        <div className="deleteReviewButton"
                        onClick={() => removeReview(review)}
                        >Delete</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="lowerRightSpotPage"></div>
      </div>
    </div>
    </>
  );
};

export default SingleSpot;
