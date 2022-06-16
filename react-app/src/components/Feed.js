import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchAllSpots } from "../store/spots";
import "./css/feed.css";

const Feed = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const spots = useSelector((state) => state?.spots?.allSpots?.spots);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(async () => {
    await dispatch(fetchAllSpots());
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <div className="loadingPage">
      <div><h1 className="loadingMessage">Loading Available Spots</h1></div>
        <img src="https://hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif"></img>
      </div>
    );
  }

  return (
    <div className="mainFeedPage">
      {spots?.slice(0).reverse().map((spot, idx) => (
        <div key={idx}>
          <div
            className="spotFeedCard"
            onClick={() => history.push(`/spots/${spot.id}`)}
          >
            <div className="spotFeedImgContainer">
              <img
                className="spotFeedImg"
                src={spot?.images[spot?.images.length - 1]?.url}
              ></img>
            </div>
            <div className="spotFeedInfo">
              <div>
                {spot.city}, {spot.state}
              </div>
              <div>
                <div className="spotFeedInfoName">{spot.name}</div>
              </div>
              <div>${spot.price} /Night</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
