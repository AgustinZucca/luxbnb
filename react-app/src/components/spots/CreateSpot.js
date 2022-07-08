import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpot, uploadFile } from "../../store/spots";
import ImageUploading from "react-images-uploading";

const CreateSpot = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  // const spots = useSelector((state) => state?.spots?.allSpots);
  const history = useHistory();
  // const [spots, setSpots] = useState([])
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Alabama");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [price, setPrice] = useState(0);
  const [errors, setErrors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgUrl, setImgUrl] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(false);
  const [hosting, setHosting] = useState(false);
  const [images, setImages] = useState([]);

  // const allSpots = spots[spots?.length - 1];
  // const lastSpotId = allSpots[allSpots.length - 1].id;

  // useEffect(async () => {
  //   const spots = await dispatch(fetchAllSpots())
  //   // setSpots(spots)
  //   // (async () => {
  //   //   const response = await fetch(`/api/spots/`);
  //   //   const spots = await response.json();
  //   //   setSpots(spots);
  //   // })();
  //   setIsLoaded(true)
  // }, [dispatch])

  // const updateImage = async (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = function (e) {
  //       setPreviewUrl(reader.result);
  //     };
  //     setImgUrl(file);
  //   } else {
  //     setPreviewUrl(false);
  //   }
  // };
  const addImages = async (images, spotId) => {
    for (let i = 0; i < images.length; i++) {
      const file = images[i].file

      await dispatch(uploadFile(file, spotId));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHosting(true);
    const spot = {
      address: address,
      city: city,
      state: state,
      name: name,
      description: description,
      beds: beds,
      baths: baths,
      price: price,
      userId: user.id,
    };

    const newSpot = await dispatch(createSpot(spot));
    if (newSpot.id) {
      await addImages(images, newSpot.id)
    }
    if (newSpot.errors) {
      setHosting(false);
      window.scrollTo(0, 0);
      setErrors(newSpot.errors);
    } else {
      history.push(`/spots/${newSpot.id}`);
    }
  };

  return (
    <div className="createSpotPage">
      <form onSubmit={(e) => handleSubmit(e)} className="createSpotForm">
        <h2>Host a Spot on LuxBnB</h2>
        <div>
          {errors.map((error, ind) => (
            <div key={ind} className="createSpotErrors">
              {error}
            </div>
          ))}
        </div>
        {/* <div className="labelInputContainerImage">
          <label>Image</label>
          <input
            type="file"
            name="img_url"
            accept=".jpg, .jpeg, .png"
            onChange={updateImage}
            required
          ></input>
        </div>
        {previewUrl && <img src={previewUrl} className="spotImgPreview"></img>} */}

        <ImageUploading
          multiple
          value={images}
          onChange={(imageList) => setImages(imageList)}
          maxNumber={5}
          dataURLKey="data_url"
          acceptType={["jpg", "png", "jpeg"]}
        >
          {({
            imageList,
            onImageUpload,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            <div className="upload__image-wrapper">
              <div
                style={isDragging ? { color: "rgb(255, 56, 92)" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
                className="add_images_container"
              >
                Click or Drag Up To 5 Images Here
              </div>
              {/* <div onClick={onImageRemoveAll}>Remove all images</div> */}
              {imageList.length >= 1 && (
                <div className="images_container">
                  {imageList.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image["data_url"]}
                        alt=""
                        className="previewImg"
                      />
                      <div className="editPhotoButtons">
                        <div
                          className="change_image"
                          onClick={() => onImageUpdate(index)}
                        >
                          Change
                        </div>
                        <div
                          className="remove_image"
                          onClick={() => onImageRemove(index)}
                        >
                          Remove
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </ImageUploading>

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
            type="select"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="Alabama" selected>
              Alabama
            </option>
            <option value="Alaska">Alaska</option>
            <option value="Arizona">Arizona</option>
            <option value="Arkansas">Arkansas</option>
            <option value="California">California</option>
            <option value="Colorado">Colorado</option>
            <option value="Connecticut">Connecticut</option>
            <option value="Delaware">Delaware</option>
            <option value="District of Columbia">District of Columbia</option>
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
        {hosting && (
          <button className="hostingSpotButton" disabled>
            Hosting...
          </button>
        )}
        {!hosting && <button className="hostSpotButton">Host Spot</button>}
      </form>
    </div>
  );
};

export default CreateSpot;
