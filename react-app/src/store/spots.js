// constants
const CREATE_SPOT = 'spots/CREATE_SPOT';
const GET_SPOT = 'spots/GET_SPOT'
const EDIT_SPOT = 'spots/EDIT_SPOT'
const DELETE_SPOT = 'spots/DELETE_SPOT'
const ALL_SPOTS = 'spots/ALL_SPOTS'


const allSpots = (spots) => ({
  type: ALL_SPOTS,
  payload: spots
})

const newSpot = (spot) => ({
  type: CREATE_SPOT,
  payload: spot
});

const getSpot = (spot) => ({
  type: GET_SPOT,
  payload: spot
})

const editSpot = (spot) => ({
  type: EDIT_SPOT,
  payload: spot
})

const deleteSpot = (spot) => ({
  type: DELETE_SPOT,
  payload: spot
})


export const createSpot = (spot) => async (dispatch) => {
  const response = await fetch('/api/spots/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(spot),
  });
  
  if (response.ok) {
    const data = await response.json();
    dispatch(newSpot(data))
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const fetchAllSpots = () => async (dispatch) => {
  const response = await fetch(`/api/spots/`)

  if (response.ok) {
    const data = await response.json();
    dispatch(allSpots(data))
    return data
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const fetchSpot = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`, {
    method: 'GET'
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(getSpot(data))
    return data
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const updateSpot = (spotId, spot) => async (dispatch) => {
  const {image, address, city, state, country, name, description, beds, baths, price} = spot
  const formData = new FormData()

  formData.append('image', image)
  formData.append('address', address)
  formData.append('city', city)
  formData.append('state', state)
  formData.append('country', country)
  formData.append('name', name)
  formData.append('description', description)
  formData.append('beds', beds)
  formData.append('baths', baths)
  formData.append('price', price)



  const response = await fetch(`/api/spots/${spotId}/edit`, {
    method: 'PUT',
    body: formData
  });
  
  if (response.ok) {
    const data = await response.json();
    dispatch(editSpot(data))
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const removeSpot = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/delete`, {
    method: 'DELETE'
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteSpot(data))
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case CREATE_SPOT:
      return {...state, spot: action.payload }
    case GET_SPOT:
      return {...state, spot: action.payload }
    case EDIT_SPOT:
      return {...state, spot: action.payload }
    case DELETE_SPOT:
      return {...state, spot: action.payload }
    case ALL_SPOTS:
      const newState = {...state}
      newState['allSpots'] = action.payload
      return newState
    default:
      return state;
  }
}
