import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux";

import { createASpot } from '../../store/spots';
import './CreateSpot.css'


const CreateSpot = ({ spots }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      country,
      address,
      city,
      stateName,
      description,
      title,
      price,
      prevImg,
      imgOneUrl,
      imgTwoUrl,
      imgThreeUrl,
      imgFourUrl
    }

    const createdSpot = dispatch(createASpot(data))

    if (createdSpot) {
      history.push(`/spots/${createdSpot.id}`)
    }
  };

  const [country, setCountry] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [stateName, setStateName] = useState('')
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [prevImg, setPrevImg] = useState('')
  const [imgOneUrl, setImgOneUrl] = useState('')
  const [imgTwoUrl, setImgTwoUrl] = useState('')
  const [imgThreeUrl, setImgThreeUrl] = useState('')
  const [imgFourUrl, setImgFourUrl] = useState('')


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
        <label htmlFor="address">Street Address</label>
        <input type="text" id='address' placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} />

        <div className="city-state-box">
          <label htmlFor="city">City</label>
          <input type="text" id='city' placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} />,
          <label htmlFor="state">State</label>
          <input type="text" id='state' placeholder='STATE' value={stateName} onChange={(e) => setStateName(e.target.value)} />
        </div>

        <div className="description-box">
          <h2>Describe your place to guests</h2>
          <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
          <textarea name="" id="description" cols="30" rows="10" placeholder='Please write at least 30 characters' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>

        <div className="title-box">
          <h2>Create a title for your spot</h2>
          <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
          <input type="text" id='title' placeholder='Name of your spot' value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="price-box">
          <h2>Set a base price for your spot</h2>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
          $<input type="number" placeholder='Price per night (USD)' id='price' value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>

        <div className="photo-box">
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <input type="url" id='prev-img' placeholder='Preview Image URL' className='spot-img' value={prevImg} onChange={(e) => setPrevImg(e.target.value)} />
          <input type="url" placeholder='Image URL' className='spot-img' value={imgOneUrl} onChange={(e) => setImgOneUrl(e.target.value)} />
          <input type="url" placeholder='Image URL' className='spot-img' value={imgTwoUrl} onChange={(e) => setImgTwoUrl(e.target.value)} />
          <input type="url" placeholder='Image URL' className='spot-img' value={imgThreeUrl} onChange={(e) => setImgThreeUrl(e.target.value)} />
          <input type="url" placeholder='Image URL' className='spot-img' value={imgFourUrl} onChange={(e) => setImgFourUrl(e.target.value)} />
        </div>

        <div className="button-box">
          <button type='submit'>Create Spot</button>
        </div>
      </div>
    </form>
  )
}

export default CreateSpot
