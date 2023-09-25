import { csrfFetch } from './csrf'


export const LOAD_SPOTS = 'spots/loadSpots' //x
export const UPDATE_SPOT = 'spots/updateSpot' //x
export const CREATE_SPOT = 'spots/createSpot' //x
export const DELETE_SPOT = 'spots/deleteSpot' //x
export const SPOT_DETAILS = 'spots/details' //x


//Action Creators
export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots
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

export const deleteSpot = (spotId) => ({
  type: DELETE_SPOT,
  spotId
})

//thunks

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

export const updateASpot = (spotId, updated) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updated)
  })
  if (res.ok) {
    const spotData = await res.json()
    dispatch(updateSpot(spotData))
  } else {
    const err = await res.json()
    return err
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

export const deleteASpot = (spotId) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE'
  })

  if (res.ok) {
    dispatch(deleteSpot(spotId))
  } else {
    const err = await res.json()
    return err
  }
}

export const createASpot = (spot) => async dispatch => {
  const res = await csrfFetch(`/api/spots`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(spot)
  })

  if (res.ok) {
    const newSpot = await res.json()
    dispatch(createSpot(newSpot))
  } else {
    const err = await res.json()
    return err
  }

}

const spotsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      const spotsState = {}
      console.log(action.spots);
      action.spots.Spots.forEach((spot) => {
        spotsState[spot.id] = spot
      })
      return spotsState

    case UPDATE_SPOT:
      return { ...state, [action.spot.id]: action.spot }

    case CREATE_SPOT:
      return { ...state, [action.spot.id]: action.spot }


    case SPOT_DETAILS:
      return { ...state, [action.spot.id]: action.spot }

    case DELETE_SPOT:
      const newState = { ...state }
      delete newState[action.spotId]
      return newState

    default:
      return state
  }
}

export default spotsReducer
