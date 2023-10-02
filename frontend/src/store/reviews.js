import { csrfFetch } from "./csrf";


export const LOAD_REVIEWS = 'reviews/loadReviews'
export const CREATE_REVIEW = 'reviews/createReview'
export const DELETE_REVIEW = 'reviews/deleteReview'


//Action Creators
export const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews: reviews.Reviews
})

export const createReview = (review) => ({
  type: CREATE_REVIEW,
  review
})

export const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId
})


//Thunks

export const getAllReviews = (spotId) => async dispatch => {
  const res = await fetch(`/api/spots/${spotId}/reviews`)

  if (res.ok) {
    const reviews = await res.json()
    dispatch(loadReviews(reviews))
  } else {
    const err = res.json()
    return err
  }
}

export const createAReview = (spotId, data) => async dispatch => {
  try {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const createdReview = await res.json()
    if (res.ok) {
      dispatch(createReview(createdReview))
      return createdReview
    } else {
      return { errors: createdReview.errors }
    }
  } catch (error) {
    console.error(error.message)
  }
}

export const deleteAReview = (reviewId) => async dispatch => {
  try {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE'
    })

    if (res.ok) {
      dispatch(deleteReview(reviewId))
      return reviewId
    }
  } catch (error) {
    console.error(error.message)
  }
}


//Reducer

const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      const reviewsState = {}
      action.reviews.forEach((review) => {
        reviewsState[review.id] = review
      })
      return reviewsState

    case CREATE_REVIEW:
      return { ...state, [action.review.id]: action.review }

    case DELETE_REVIEW:
      const newState = { ...state }
      delete newState[action.reviewId]
      return newState

    default:
      return state
  }
}

export default reviewsReducer
