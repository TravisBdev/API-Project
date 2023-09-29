import { csrfFetch } from './csrf'


export const LOAD_SPOTS = 'spots/loadSpots'
export const UPDATE_SPOT = 'spots/updateSpot'
export const CREATE_SPOT = 'spots/createSpot'
export const DELETE_SPOT = 'spots/deleteSpot'
export const SPOT_DETAILS = 'spots/details'
export const USER_SPOTS = 'spots/userSpots'
export const CREATE_IMAGE = 'spots/createImage'
// export const CREATE_AN_IMAGE = 'spots/createAnImage'


//Action Creators
export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots: spots.Spots
})

export const updateSpot = (spot) => ({
  type: UPDATE_SPOT,
  spot
})

export const createSpot = (spot) => ({
  type: CREATE_SPOT,
  spot
})

export const spotDetails = (spot) => ({
  type: SPOT_DETAILS,
  spot
})

export const setUserSpots = (spots) => ({
  type: USER_SPOTS,
  spots
})

export const createImage = (image) => ({
  type: CREATE_IMAGE,
  image
})

export const deleteSpot = (spotId) => ({
  type: DELETE_SPOT,
  spotId
})





//Thunks

export const getAllSpots = () => async dispatch => {
  const res = await fetch('/api/spots')
  if (res.ok) {
    const spots = await res.json()
    dispatch(loadSpots(spots))
  } else {
    const err = await res.json()
    return err
  }
}

export const updateASpot = (spotId, data) => async dispatch => {
  try {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const spotData = await res.json()
    if (res.ok) {
      dispatch(updateSpot(spotData))
      return spotData
    } else {
      const err = await res.json()
      return err
    }
  } catch (error) {
    console.error(error.message)
  }
}

export const getSpotDetails = (spotId) => async dispatch => {
  const res = await fetch(`/api/spots/${spotId}`)

  if (res.ok) {
    const spotData = await res.json()
    dispatch(spotDetails(spotData))
  } else {
    const err = await res.json()
    return err
  }
}

export const createASpot = (spot) => async dispatch => {
  try {
    const res = await csrfFetch(`/api/spots`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(spot)
    })

    const createdSpot = await res.json()
    if (res.ok) {
      dispatch(createSpot(createdSpot))
      return createdSpot
    } else {
      return { errors: createdSpot.errors }
    }
  } catch (error) {
    console.error(error.message);
  }
}

export const createAnImage = (spotId, image) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(image)
  })

  if (res.ok) {
    const createdImg = res.json()
    dispatch(createImage(createdImg))
  } else {
    const err = res.json
    return err
  }
}

export const getUserSpots = () => async dispatch => {
  try {
    const res = await csrfFetch('/api/spots/current')

    if (res.ok) {
      const userSpots = await res.json()
      dispatch(setUserSpots(userSpots.Spots))
    }
  } catch (error) {
    console.error(error.message)
  }
}

export const deleteASpot = (spotId) => async dispatch => {
  try {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'DELETE'
    })

    if (res.ok) {
      dispatch(deleteSpot(spotId))
      return spotId
    }
  } catch (error) {
    console.error(error.message)
  }
}

//Reducer

const spotsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      const spotsState = {}
      action.spots.forEach((spot) => {
        spotsState[spot.id] = spot
      })
      return spotsState

    case UPDATE_SPOT:
      return { ...state, [action.spot.id]: action.spot }

    case CREATE_SPOT:
      return { ...state, [action.spot.id]: action.spot }

    case CREATE_IMAGE:
      return { ...state, [action.image.id]: action.image }

    case SPOT_DETAILS:
      return { ...state, [action.spot.id]: action.spot }

    case USER_SPOTS:
      return { ...state, userSpots: action.spots }

    case DELETE_SPOT:
      const newState = { ...state }
      delete newState[action.spotId]
      return newState

    default:
      return state
  }


}

export default spotsReducer
