import { useDispatch } from "react-redux";
import { useState } from "react";

import { createAReview } from "../../store/reviews";
import { getSpotDetails } from "../../store/spots";
import { useModal } from "../../context/Modal";
import './ReviewModal.css'

const ReviewModal = ({ spotId }) => {
  const { closeModal } = useModal()
  const dispatch = useDispatch()
  const [review, setReview] = useState('')
  const [stars, setStars] = useState(0)
  const [errors, setErrors] = useState({})


  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})

    const data = {
      review,
      stars
    }

    try {

      const createdReview = await dispatch(createAReview(spotId, data))
      if (createdReview?.errors) {
        setErrors(createdReview.errors)
      } else {
        dispatch(getSpotDetails(spotId))
        closeModal()
      }
    } catch (error) {
      return error.message
    }
  }

  return (
    <div className="review-box">
      <h1>How was your stay?</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Leave your review here..."
        />
        <div className="stars">
          <span onClick={() => setStars(1)}><i className="fa-regular fa-star fa-xs"></i></span>
          <span onClick={() => setStars(2)}><i className="fa-regular fa-star fa-xs"></i></span>
          <span onClick={() => setStars(4)}><i className="fa-regular fa-star fa-xs"></i></span>
          <span onClick={() => setStars(3)}><i className="fa-regular fa-star fa-xs"></i></span>
          <span onClick={() => setStars(5)}><i className="fa-regular fa-star fa-xs"></i></span>

        </div>
        {errors.review && <p>{errors.review}</p>}
        <button type="submit">Submit Review</button>
      </form>
    </div>
  )
}

export default ReviewModal
