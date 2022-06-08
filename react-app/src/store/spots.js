// constants
const CREATE_SPOT = 'spots/CREATE_SPOT';


const newSpot = (spot) => ({
  type: CREATE_SPOT,
  payload: spot
});


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
    return null;
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
      return { user: action.payload }
    default:
      return state;
  }
}
