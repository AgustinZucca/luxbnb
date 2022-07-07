import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  fetchSpot,
  removeSpot,
  updateSpot,
  uploadFile,
  removeImg,
} from "../../store/spots";
import ImageUploading from "react-images-uploading";


const EditSpot = () => {
  const spot = useSelector((state) => state?.spots?.spot);
  const history = useHistory();
  const dispatch = useDispatch();
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
  const [previewUrl, setPreviewUrl] = useState(spot?.images[0]?.url);
  const [newImg, setNewImg] = useState();
  const [newImgId, setNewImgId] = useState(spot?.images[0]?.id);
  const [oldImgId, setOldImgId] = useState(spot?.images[0]?.id);
  const [showDelete, setShowDelete] = useState(false);
  const [hosting, setHosting] = useState(false);
  const [images, setImages] = useState('')
  console.log(images)
  // const updateImage = async (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = function (e) {
  //     setPreviewUrl(reader.result);
  //   };
  //   setNewImgId(newImgId + 1);
  //   setNewImg(file);
  // };

  useEffect(async () => {
    dispatch(fetchSpot(spotId));
    let images = spot?.images.map((image) => {
      return { data_url: image }; 
    })
    setImages(images)
    if (spot) {
      setIsLoaded(true);
    }
  }, [dispatch]);

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
    };
    const newSpot = await dispatch(updateSpot(spotId, spot));
    if (newSpot.id) {
      if (newImgId !== oldImgId) {
        const deleteImg = await dispatch(removeImg(oldImgId));
        console.log('IN MIDDLE OF DELETE AND IMAGE UPLOAD')
        const imageUpload = await dispatch(uploadFile(newImg, spotId));
      }
      return history.push(`/spots/${spotId}`);
    } else {
      setErrors(newSpot);
      setHosting(false);
    }
    return
  };

  const handleDeleteSpot = () => {
    dispatch(removeSpot(spotId));
    history.push("/");
  };


  return (
    <div className="createSpotPageEdit">
      {showDelete && (
        <>
          <div className="modalBkg" onClick={() => setShowDelete(false)}></div>
          <div className="deleteModal">
            <div style={{ fontSize: "20px", marginBottom: "10px" }}>
              Deleting Spot
            </div>
            <div>Are you sure you want to delete this spot?</div>
            <div className="deleteModalButtons">
              <div
                className="cancelButton"
                onClick={() => setShowDelete(false)}
              >
                Cancel
              </div>
              <div
                className="deleteButtonFINAL"
                onClick={() => handleDeleteSpot()}
              >
                Delete
              </div>
            </div>
          </div>
        </>
      )}
      <form onSubmit={(e) => handleSubmit(e)} className="createSpotForm">
        <h2>Edit your spot</h2>
        <div>
          {errors.map((error, ind) => (
            <div key={ind} className="createSpotErrors">{error}</div>
          ))}
        </div>
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
        <div>
          <label>Image</label>
          <input
            type="file"
            name="img_url"
            accept=".jpg, .jpeg, .png"
            onChange={updateImage}
            className="imgInputBtn"
          ></input>
        </div>
        {previewUrl && (
          <img src={previewUrl} className="spotImgPreviewEdit"></img>
        )}
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
        <div className="editButtonsContainer">
          {hosting && (
            <button className="hostSpotButton" disabled={true}>
              Hosting...
            </button>
          )}
          {!hosting && <button className="hostSpotButton">Edit Spot</button>}
          <div className="deleteSpotButton" onClick={() => setShowDelete(true)}>
            Delete
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditSpot;
