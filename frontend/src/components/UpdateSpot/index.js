import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { updateASpot, getSpotDetails } from "../../store/spots";
import './UpdateSpot.css'

const UpdateSpot = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { spotId } = useParams()

  const spot = useSelector(state => state.spots[spotId])

  useEffect(() => {
    dispatch(getSpotDetails(spotId));
  }, [dispatch, spotId]);

  const [country, setCountry] = useState(spot?.country)
  const [address, setAddress] = useState(spot?.address)
  const [city, setCity] = useState(spot?.state)
  const [description, setDescription] = useState(spot?.description)
  const [title, setTitle] = useState(spot?.title)
  const [price, setPrice] = useState(spot?.price)
  const [previewImage, setPreviewImage] = useState(spot?.previewImage)

  const handleSubmit = (e) => {
    e.preventDefault();


    const data = {
      country,
      address,
      city,
      state,
      description,
      title,
      price,
      previewImage
    }


    const updatedSpot = dispatch(updateASpot(spotId, data))

    if (updatedSpot) {
      history.push(`/spots/${updatedSpot.id}`)
    }

  }

  return (
    <form className="create-spot-form" onSubmit={handleSubmit}>
      <div className="header-box">
        <h1>Create a new Spot</h1>
        <h2>Where's your place located?</h2>
        <p>Guests will only get your exact address once they book a reservation.</p>
      </div>

      <div className="location-deets-box">
        <label htmlFor="country">Country</label>
        <input type="text" id='country' placeholder='Country' value={country} onChange={(e) => setCountry(e.target.value)} />
        {/* {didSubmit && errors.country && <p className='err'>{errors.country}</p>} */}

        <label htmlFor="address">Street Address</label>
        <input type="text" id='address' placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} />
        {/* {didSubmit && errors.address && <p className='err'>{errors.address}</p>} */}


        <div className="city-state-box">
          <label htmlFor="city">City</label>
          <input type="text" id='city' placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} />,
          {/* {didSubmit && errors.city && <p className='err'>{errors.city}</p>} */}

          <label htmlFor="state">State</label>
          <input type="text" id='state' placeholder='STATE' value={state} onChange={(e) => setState(e.target.value)} />
          {/* {didSubmit && errors.state && <p className='err'>{errors.state}</p>} */}
        </div>

        <div className="description-box">
          <h2>Describe your place to guests</h2>
          <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>

          <textarea name="" id="description" cols="30" rows="10" placeholder='Please write at least 30 characters' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          {/* {didSubmit && errors.description && <p className='err'>{errors.description}</p>} */}
        </div>

        <div className="title-box">
          <h2>Create a title for your spot</h2>
          <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>

          <input type="text" id='title' placeholder='Name of your spot' value={title} onChange={(e) => setTitle(e.target.value)} />
          {/* {didSubmit && errors.title && <p className='err'>{errors.title}</p>} */}
        </div>

        <div className="price-box">
          <h2>Set a base price for your spot</h2>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>

          $<input type="number" placeholder='Price per night (USD)' id='price' value={price} onChange={(e) => setPrice(e.target.value)} />
          {/* {didSubmit && errors.price && <p className='err'>{errors.price}</p>} */}
        </div>

        <div className="photo-box">
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>

          <input type="url" id='prev-img' placeholder='Preview Image URL' className='spot-img' value={previewImage} onChange={(e) => setPreviewImage(e.target.value)} />
          {/* {didSubmit && errors.previewImage && <p className='err'>{errors.previewImage}</p>} */}

          <input type="url" placeholder='Image URL' className='spot-img' value={imgOneUrl} onChange={(e) => setImgOneUrl(e.target.value)} />
          {/* {didSubmit && errors.imgOneUrl && <p className='err'>{errors.imgOneUrl}</p>} */}

          <input type="url" placeholder='Image URL' className='spot-img' value={imgTwoUrl} onChange={(e) => setImgTwoUrl(e.target.value)} />
          {/* {didSubmit && errors.imgTwoUrl && <p className='err'>{errors.imgTwoUrl}</p>} */}

          <input type="url" placeholder='Image URL' className='spot-img' value={imgThreeUrl} onChange={(e) => setImgThreeUrl(e.target.value)} />
          {/* {didSubmit && errors.imgThreeUrl && <p className='err'>{errors.imgThreeUrl}</p>} */}

          <input type="url" placeholder='Image URL' className='spot-img' value={imgFourUrl} onChange={(e) => setImgFourUrl(e.target.value)} />
          {/* {didSubmit && errors.imgFourUrl && <p className='err'>{errors.imgFourUrl}</p>} */}
        </div>

        <div className="button-box">
          <button type='submit'>Update Spot</button>
        </div>
      </div>
    </form>
  )
}

export default UpdateSpot
