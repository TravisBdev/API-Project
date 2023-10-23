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
  const [activeRating, setActiveRating] = useState(stars)
  const [disabled, setDisabled] = useState(false)

  const onChange = (num) => {
    setStars(parseInt(num));
  };


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
          <div className={activeRating >= 1 ? 'filled' : 'empty'}
            onMouseEnter={() => { if (!disabled) setActiveRating(1) }}
            onMouseLeave={() => { if (!disabled) setActiveRating(stars) }}
            onClick={() => { if (!disabled) onChange(1) }}>
            <i className="fa fa-star"></i></div>

          <div className={activeRating >= 2 ? 'filled' : 'empty'}
            onMouseEnter={() => { if (!disabled) setActiveRating(2) }}
            onMouseLeave={() => { if (!disabled) setActiveRating(stars) }}
            onClick={() => { if (!disabled) onChange(2) }}>
            <i className="fa fa-star"></i></div>

          <div className={activeRating >= 3 ? 'filled' : 'empty'}
            onMouseEnter={() => { if (!disabled) setActiveRating(3) }}
            onMouseLeave={() => { if (!disabled) setActiveRating(stars) }}
            onClick={() => { if (!disabled) onChange(3) }}>
            <i className="fa fa-star"></i></div>

          <div className={activeRating >= 4 ? 'filled' : 'empty'}
            onMouseEnter={() => { if (!disabled) setActiveRating(4) }}
            onMouseLeave={() => { if (!disabled) setActiveRating(stars) }}
            onClick={() => { if (!disabled) onChange(4) }}>
            <i className="fa fa-star"></i></div>

          <div className={activeRating >= 5 ? 'filled' : 'empty'}
            onMouseEnter={() => { if (!disabled) setActiveRating(5) }}
            onMouseLeave={() => { if (!disabled) setActiveRating(stars) }}
            onClick={() => { if (!disabled) onChange(5) }}>
            <i className="fa fa-star"></i></div>

        </div>
        {errors.review && <p>{errors.review}</p>}
        <button type="submit">Submit Review</button>
      </form>
    </div>
  )
}

export default ReviewModal
