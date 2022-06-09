import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchSpot } from "../../store/spots";
import "./spots.css";

const SingleSpot = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spots.spot);
  const { spotId } = useParams();

  useEffect(async () => {
    dispatch(fetchSpot(spotId));
  }, [dispatch]);

  const editSpot = () => {
    history.push(`/spots/${spot?.id}/edit`)
  };

  return (
    <div className="singleSpotPage">
      <div className="upperSpotPage">
        <h1 className="spotAd">{spot?.name}</h1>
        <div className="upperSpotPagebottom">
          {spot?.address}
          {spot?.user_id == user?.id && (
            <div className="editSpotButton" onClick={editSpot}>Edit</div>
          )}
        </div>
      </div>
      <div className="spotPicturesContainer">
        <img className="spotPicture" src={spot?.image}></img>
      </div>
    </div>
  );
};

export default SingleSpot;
