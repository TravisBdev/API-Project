import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { getSpotDetails } from "../../store/spots";
// import { getAllReviews } from "../../store/reviews";

import ReviewList from "../ReviewList";
import ReviewModal from "../ReviewModal";


import './SpotDetails.css'

const SpotDetails = () => {
  const { spotId } = useParams()
  const sessionUser = useSelector(state => state.session.user);
  const { setModalContent } = useModal()
  const dispatch = useDispatch()
  const spot = useSelector(state => state.spots[spotId])

  const isNotOwner = sessionUser?.id !== spot.Owner?.id
  const user = sessionUser?.id

  const showImgs = (imgs) => {
    return imgs.map(img => {
      if (img.url) {
        return <img className='spot-img' src={img.url} alt={img.url} key={img.id} />
      }
      return null
    })
  }


  //added this to check against
  // const reviews = useSelector(state => Object.values(state.reviews))
  //Added this to load the reviews to check against
  // useEffect(() => {
  //   dispatch(getAllReviews(spotId))
  // }, [dispatch])


  useEffect(() => {
    dispatch(getSpotDetails(spotId))
  }, [dispatch, spotId])

  if (!spot) {
    return null
  }

  const postReview = () => {
    setModalContent(<ReviewModal spotId={spotId} />);
  };

  const handleClick = () => {
    alert('Feature Coming Soon...')
  }

  const { name, city, state, country, description, price, numReviews, avgRating, Owner, SpotImages } = spot
  const reviewCount = numReviews < 1


  return (
    <div className="spot-deets">
      <h1>{name}</h1>
      <div className="location-deets">
        {city}, {state}, {country}
      </div>
      <div className="img-container">
        {SpotImages && showImgs(SpotImages)}
      </div>
      <div className="host-deets">
        <h2>Hosted by {Owner?.firstName} {Owner?.lastName}</h2>
        <p>{description}</p>
        <div className="reserve-box">
          <div className="reserve-deets">
            <h3 className="price">{price} night</h3>
            <div className="rating-reviews">
              {avgRating ? <><i className="fa-solid fa-star fa-xs"></i> {avgRating.toFixed(1)} • {numReviews} {numReviews === 1 ? 'review' : 'reviews'}</> : <><i className="fa-solid fa-star fa-xs"></i>New</>}
            </div>
            <div className="reserve-btn">
              <button onClick={handleClick}>Reserve</button>
            </div>
          </div>
        </div>
      </div>

      <div className="reviews-box">

        <div className="reviews-heading">
          {avgRating ? <><i className="fa-solid fa-star fa-xs"></i> {avgRating.toFixed(1)} • {numReviews} {numReviews === 1 ? 'review' : 'reviews'}</> : <><i className="fa-solid fa-star fa-xs"></i>New</>}
          {sessionUser && user && isNotOwner && <button onClick={postReview}>Post Your Review</button>}
          {reviewCount && user && isNotOwner && <p>Be the first to post a review!</p>}
        </div>

        <div className="review-list">
          <ReviewList spotId={spotId} />
        </div>

      </div>
    </div>
  )
}

export default SpotDetails
