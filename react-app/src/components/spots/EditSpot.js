import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchSpot, removeSpot, updateSpot } from "../../store/spots";

const EditSpot = () => {
  const spot = useSelector((state) => state?.spots?.spot);
  const history = useHistory();
  const dispatch = useDispatch();
  const [image, setImage] = useState(spot?.image);
  const [address, setAddress] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [country, setCountry] = useState(spot?.country);
  const [name, setName] = useState(spot?.name);
  const [description, setDescription] = useState(spot?.description);
  const [beds, setBeds] = useState(spot?.beds);
  const [baths, setBaths] = useState(spot?.baths);
  const [price, setPrice] = useState(spot?.price);
  const [errors, setErrors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { spotId } = useParams();

  useEffect(async () => {
    dispatch(fetchSpot(spotId));

    if (spot) {
      setIsLoaded(true);
    }
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const spot = {
      image: image,
      address: address,
      city: city,
      state: state,
      country: country,
      name: name,
      description: description,
      beds: beds,
      baths: baths,
      price: price,
    };
    const newSpot = await dispatch(updateSpot(spotId, spot));

    if (newSpot.errors) {
      setErrors(newSpot.errors);
    } else {
      history.push(`/spots/${newSpot.id}`);
    }
  };

  const handleDeleteSpot = () => {
    dispatch(removeSpot(spotId))
    history.push('/')
  }


  // if (isLoaded) {
    return (
      <div className="editSpotPage">
        <form onSubmit={(e) => handleSubmit(e)}>
          {/* <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div> */}
          <div>
            <label>Image</label>
            <input
              type="text"
              placeholder="Image Url"
              value={image}
              required
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div>
            <label>Address</label>
            <input
              type="text"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <label>State</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div>
            <label>Country</label>
            <input
              type="text"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              type="text"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Beds</label>
            <input
              type="number"
              value={beds}
              required
              onChange={(e) => setBeds(e.target.value)}
            />
          </div>
          <div>
            <label>Baths</label>
            <input
              type="number"
              value={baths}
              required
              onChange={(e) => setBaths(e.target.value)}
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              value={price}
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <button>Host Spot</button>
        </form>
        <div className="deleteSpotButton" onClick={handleDeleteSpot}>Delete</div>
      </div>
    );
  // } else {
  //   return null
  // }
};

export default EditSpot;
