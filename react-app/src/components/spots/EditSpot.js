import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  fetchSpot,
  removeSpot,
  updateSpot,
  uploadFile,
} from "../../store/spots";

const EditSpot = () => {
  const spot = useSelector((state) => state?.spots?.spot);
  const history = useHistory();
  const dispatch = useDispatch();
  const [image, setImage] = useState(spot?.image);
  const [address, setAddress] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [name, setName] = useState(spot?.name);
  const [description, setDescription] = useState(spot?.description);
  const [beds, setBeds] = useState(spot?.beds);
  const [baths, setBaths] = useState(spot?.baths);
  const [price, setPrice] = useState(spot?.price);
  const [errors, setErrors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { spotId } = useParams();
  const [imgUrl, setImgUrl] = useState(spot?.images[0]);
  const [previewUrl, setPreviewUrl] = useState(spot?.images[0]);
  const [oldImg, setOldImg] = useState(imgUrl);

  const updateImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      setPreviewUrl(reader.result);
    };
    setImgUrl(file);
  };

  useEffect(async () => {
    dispatch(fetchSpot(spotId));

    if (spot) {
      setIsLoaded(true);
    }
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const spot = {
      address: address,
      city: city,
      state: state,
      name: name,
      description: description,
      beds: beds,
      baths: baths,
      price: price,
    };
    const newSpot = await dispatch(updateSpot(spotId, spot));
    if (imgUrl !== oldImg) {
      const imageUpload = await dispatch(uploadFile(imgUrl, newSpot.id));
    }
    if (newSpot.errors) {
      setErrors(newSpot.errors);
    } else {
      history.push(`/spots/${newSpot.id}`);
    }
  };

  const handleDeleteSpot = () => {
    dispatch(removeSpot(spotId));
    history.push("/");
  };

  // if (isLoaded) {
  return (
    <div className="createSpotPage">
      <form onSubmit={(e) => handleSubmit(e)} className="createSpotForm">
        <h2>Host a Spot on LuxBnB</h2>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label>Image</label>
          <input
            type="file"
            name="img_url"
            accept=".jpg, .jpeg, .png"
            onChange={updateImage}
          ></input>
        </div>
        {previewUrl && <img src={previewUrl} className="spotImgPreview"></img>}
        <div className="labelInputContainer">
          <label>Address</label>
          <input
            className="newSpotInputs"
            type="text"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="labelInputContainer">
          <label>City</label>
          <input
            className="newSpotInputs"
            type="text"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="labelInputContainer">
          <label>State</label>
          <select
            className="newSpotInputState"
            form="new_spot_form"
            type="select"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="Alabama">Alabama</option>
            <option value="Alaska">Alaska</option>
            <option value="Arizona">Arizona</option>
            <option value="Arkansas">Arkansas</option>
            <option value="California">California</option>
            <option value="Colorado">Colorado</option>
            <option value="Connecticut">Connecticut</option>
            <option value="Delaware">Delaware</option>
            <option value="District Of Columbia">District Of Columbia</option>
            <option value="Florida">Florida</option>
            <option value="Georgia">Georgia</option>
            <option value="Hawaii">Hawaii</option>
            <option value="Idaho">Idaho</option>
            <option value="Illinois">Illinois</option>
            <option value="Indiana">Indiana</option>
            <option value="Iowa">Iowa</option>
            <option value="Kansas">Kansas</option>
            <option value="Kentucky">Kentucky</option>
            <option value="Louisiana">Louisiana</option>
            <option value="Maine">Maine</option>
            <option value="Maryland">Maryland</option>
            <option value="Massachusetts">Massachusetts</option>
            <option value="Michigan">Michigan</option>
            <option value="Minnesota">Minnesota</option>
            <option value="Mississippi">Mississippi</option>
            <option value="Missouri">Missouri</option>
            <option value="Montana">Montana</option>
            <option value="Nebraska">Nebraska</option>
            <option value="Nevada">Nevada</option>
            <option value="New Hampshire">New Hampshire</option>
            <option value="New Jersey">New Jersey</option>
            <option value="New Mexico">New Mexico</option>
            <option value="New York">New York</option>
            <option value="North Carolina">North Carolina</option>
            <option value="North Dakota">North Dakota</option>
            <option value="Ohio">Ohio</option>
            <option value="Oklahoma">Oklahoma</option>
            <option value="Oregon">Oregon</option>
            <option value="Pennsylvania">Pennsylvania</option>
            <option value="Rhode Island">Rhode Island</option>
            <option value="South Carolina">South Carolina</option>
            <option value="South Dakota">South Dakota</option>
            <option value="Tennessee">Tennessee</option>
            <option value="Texas">Texas</option>
            <option value="Utah">Utah</option>
            <option value="Vermont">Vermont</option>
            <option value="Virginia">Virginia</option>
            <option value="Washington">Washington</option>
            <option value="West Virginia">West Virginia</option>
            <option value="Wisconsin">Wisconsin</option>
            <option value="Wyoming">Wyoming</option>
          </select>
        </div>
        <div className="labelInputContainer">
          <label>Name</label>
          <input
            className="newSpotInputs"
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="labelInputContainer">
          <label>Description</label>
          <textarea
            type="text"
            value={description}
            required
            className="spotDescriptionInput"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="labelInputContainer">
          <label>Beds</label>
          <input
            className="newSpotInputs"
            type="number"
            value={beds}
            required
            min="0"
            onChange={(e) => setBeds(e.target.value)}
          />
        </div>
        <div className="labelInputContainer">
          <label>Baths</label>
          <input
            className="newSpotInputs"
            type="number"
            value={baths}
            required
            min="0"
            onChange={(e) => setBaths(e.target.value)}
          />
        </div>
        <div className="labelInputContainer">
          <label>Price/Night</label>
          <div>
            $
            <input
              className="newSpotInputs"
              type="number"
              value={price}
              required
              min="0"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button className="hostSpotButton">Host Spot</button>
          <div onClick={handleDeleteSpot}>Delete</div>
        </div>
      </form>
    </div>
  );
};

export default EditSpot;
