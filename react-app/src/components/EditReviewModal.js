import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { updateReview } from "../store/reviews";


const EditReview = ({ currReview, hideModal, setCount }) => {
    const dispatch = useDispatch()
  const [rating, setRating] = useState(currReview.rating);
  const [review, setReview] = useState(currReview.review);
  const user = useSelector(state => state.session.user)
  const spot = useSelector((state) => state.spots.spot);
  

  const closeModal = () => {
    hideModal();
  };

  const handleReviewEdit = async (e) => {
    e.preventDefault();
    const fullReview = {
      user_id: user.id,
      spot_id: spot.id,
      rating: rating,
      review: review,
    };
    const newReview = await dispatch(updateReview(currReview.id, fullReview));
    
    if (newReview) {
        setCount()
        hideModal()
    }
  }

  return (
    <div className="editReviewModal">
      <div className="editReviewFormBkg" onClick={() => closeModal()}></div>
      <form
          onSubmit={(e) => handleReviewEdit(e)}
        className="editReviewForm"
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
          value={review}
          placeholder="Leave your review of this spot"
          onChange={(e) => setReview(e.target.value)}
        />
        <button className="editReviewSubmit">Submit</button>
      </form>
    </div>
  );
};

export default EditReview;
