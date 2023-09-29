import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { getSpotDetails } from "../../store/spots";

import ReviewList from "../ReviewList";
import ReviewModal from "../ReviewModal";


import './SpotDetails.css'

const SpotDetails = () => {
  const sessionUser = useSelector(state => state.session.user);
  const { setModalContent } = useModal()

  const dispatch = useDispatch()
  const { spotId } = useParams()

  const details = useSelector(state => state.spots[spotId])


  useEffect(() => {
    dispatch(getSpotDetails(spotId))
  }, [dispatch, spotId])

  if (!details) {
    return null
  }

  const postReview = () => {
    setModalContent(<ReviewModal spotId={spotId} />);
  };

  const handleClick = () => {
    alert('Feature Coming Soon...')
  }

  const { name, city, state, country, description, price, numReviews, avgRating, Owner, SpotImages } = details



  return (
    <div className="spot-deets">
      <h1>{name}</h1>
      <div className="location-deets">
        {city}, {state}, {country}
      </div>
      <div className="img-container">
        {SpotImages?.map(img => (
          <img className='spot-img' src={img.url} alt="" key={img.id} />
        ))}
      </div>
      <div className="host-deets">
        <h2>Hosted by {Owner?.firstName} {Owner?.lastName}</h2>
        <p>{description}</p>
        <div className="reserve-box">
          <div className="reserve-deets">
            <h3 className="price">{price} night</h3>
            <div className="rating-reviews">
              {avgRating ? <><i className="fa-solid fa-star fa-xs"></i> {avgRating.toFixed(2)} • {numReviews} reviews</> : 'New'}
            </div>
            <div className="reserve-btn">
              <button onClick={handleClick}>Reserve</button>
            </div>
          </div>
        </div>
      </div>

      <div className="reviews-box">

        <div className="reviews-heading">
          {avgRating ? <><i className="fa-solid fa-star fa-xs"></i> {avgRating.toFixed(2)} • {numReviews} reviews</> : 'New'}
          {sessionUser && <button onClick={postReview}>Post Your Review</button>}
        </div>

        <div className="review-list">
          <ReviewList spotId={spotId} />
        </div>

      </div>
    </div>
  )
}

export default SpotDetails
