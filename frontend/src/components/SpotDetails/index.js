import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getSpotDetails } from "../../store/spots";
import './SpotDetails.css'

const SpotDetails = () => {
  const dispatch = useDispatch()
  const { spotId } = useParams()

  const details = useSelector(state => state.spots[spotId])


  // console.log('----->', details);

  useEffect(() => {
    dispatch(getSpotDetails(spotId))
  }, [dispatch, spotId])

  if (!details) {
    return null
  }

  const handleClick = () => {
    alert('Feature Coming Soon...')
  }

  const { name, city, state, country, description, price, numReviews, avgRating, Owner, SpotImages } = details

  // console.log('-----SpotImages', SpotImages);

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
              {avgRating ? <><i className="fa-solid fa-star fa-xs"></i> {avgRating} {numReviews} reviews</> : 'New'}
            </div>
            <div className="reserve-btn">
              <button onClick={handleClick}>Reserve</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpotDetails