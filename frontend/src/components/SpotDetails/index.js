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

  const { name, city, state, country, description, Owner, SpotImages } = details

  console.log('-----SpotImages', SpotImages);

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
      </div>
    </div>
  )
}

export default SpotDetails
