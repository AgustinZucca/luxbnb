import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpot } from "../../store/spots";


const CreateSpot = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [price, setPrice] = useState(0);
  const [errors, setErrors] = useState([])

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
    const newSpot = await dispatch(createSpot(spot));
    if (newSpot.errors) {
      setErrors(newSpot.errors)
    } else {
      history.push(`/spots/${newSpot.id}`)
    }
  };

  return (
    <div className="createSpotPage">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
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
            min='0'
            onChange={(e) => setBeds(e.target.value)}
          />
        </div>
        <div>
          <label>Baths</label>
          <input
            type="number"
            value={baths}
            required
            min='0'
            onChange={(e) => setBaths(e.target.value)}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            value={price}
            required
            min='0'
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button>Host Spot</button>
      </form>
    </div>
  );
};

export default CreateSpot;
