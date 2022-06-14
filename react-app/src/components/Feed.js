import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchAllSpots } from "../store/spots";
import "./css/feed.css";

const Feed = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const spots = useSelector((state) => state?.spots?.allSpots?.spots);
  useEffect(async () => {
    dispatch(fetchAllSpots());
  }, [dispatch]);

  return (
    <div className="mainFeedPage">
      {spots?.map((spot, idx) => (
        <div key={idx}>
          <div className="spotFeedCard" onClick={() => history.push(`/spots/${spot.id}`)}>
            <div className="spotFeedImgContainer">
              <img className="spotFeedImg" src={spot.image}></img>
            </div>
            <div className="spotFeedInfo">
              <div>
                {spot.city}, {spot.state}
              </div>
              <div>
                  <div className="spotFeedInfoName">{spot.name}</div>
              </div>
              <div>
                  ${spot.price} /Night
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
