import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux";

import { createASpot } from '../../store/spots';
import './CreateSpot.css'


const CreateSpot = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [country, setCountry] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [prevImg, setPrevImg] = useState('')
  const [imgOneUrl, setImgOneUrl] = useState('')
  const [imgTwoUrl, setImgTwoUrl] = useState('')
  const [imgThreeUrl, setImgThreeUrl] = useState('')
  const [imgFourUrl, setImgFourUrl] = useState('')
  const [errors, setErrors] = useState({})
  const [didSubmit, setDidSubmit] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    setDidSubmit(true)
    setErrors({})
    const errsObj = {}
    const endings = ['.jpg', '.png', '.jpeg']

    const checkEndings = (url) => {
      endings.forEach(ending => {
        if (url.endsWith(ending)) {
          return true
        }
      })
      return false
    }

    const urlError = 'Image URL must end in .png, .jpg, or .jpeg'

    if (!country) errsObj.country = 'Country is required'
    if (!address) errsObj.address = 'Address is required'
    if (!city) errsObj.city = 'City is required'
    if (!state) errsObj.state = 'State is required'
    if (!description || description.length < 30) errsObj.description = 'Description needs a minimum of 30 characters'
    if (!title) errsObj.title = 'Name is required'
    if (!price) errsObj.price = 'Price is required'
    if (!prevImg) errsObj.prevImg = 'Preview image is required'
    if (!checkEndings(prevImg)) errsObj.imgOneUrl = urlError
    if (!checkEndings(imgOneUrl)) errsObj.imgOneUrl = urlError
    if (!checkEndings(imgTwoUrl)) errsObj.imgOneUrl = urlError
    if (!checkEndings(imgThreeUrl)) errsObj.imgOneUrl = urlError
    if (!checkEndings(imgFourUrl)) errsObj.imgOneUrl = urlError

    if (Object.keys(errsObj) > 0) {
      setErrors(errsObj)
      return
    }

    const data = {
      country,
      address,
      city,
      state,
      description,
      title,
      price,
    }

    const createdSpot = dispatch(createASpot(data))

    if (createdSpot) {
      history.push(`/spots/${createdSpot.id}`)
    }
  };




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
        {didSubmit && errors.country && <p className='err'>{errors.country}</p>}

        <label htmlFor="address">Street Address</label>
        <input type="text" id='address' placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} />
        {didSubmit && errors.address && <p className='err'>{errors.address}</p>}


        <div className="city-state-box">
          <label htmlFor="city">City</label>
          <input type="text" id='city' placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} />,
          {didSubmit && errors.city && <p className='err'>{errors.city}</p>}

          <label htmlFor="state">State</label>
          <input type="text" id='state' placeholder='STATE' value={state} onChange={(e) => setState(e.target.value)} />
          {didSubmit && errors.state && <p className='err'>{errors.state}</p>}
        </div>

        <div className="description-box">
          <h2>Describe your place to guests</h2>
          <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>

          <textarea name="" id="description" cols="30" rows="10" placeholder='Please write at least 30 characters' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          {didSubmit && errors.description && <p className='err'>{errors.description}</p>}
        </div>

        <div className="title-box">
          <h2>Create a title for your spot</h2>
          <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>

          <input type="text" id='title' placeholder='Name of your spot' value={title} onChange={(e) => setTitle(e.target.value)} />
          {didSubmit && errors.title && <p className='err'>{errors.title}</p>}
        </div>

        <div className="price-box">
          <h2>Set a base price for your spot</h2>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>

          $<input type="number" placeholder='Price per night (USD)' id='price' value={price} onChange={(e) => setPrice(e.target.value)} />
          {didSubmit && errors.price && <p className='err'>{errors.price}</p>}
        </div>

        <div className="photo-box">
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>

          <input type="url" id='prev-img' placeholder='Preview Image URL' className='spot-img' value={prevImg} onChange={(e) => setPrevImg(e.target.value)} />
          {didSubmit && errors.prevImg && <p className='err'>{errors.prevImg}</p>}

          <input type="url" placeholder='Image URL' className='spot-img' value={imgOneUrl} onChange={(e) => setImgOneUrl(e.target.value)} />
          {didSubmit && errors.imgOneUrl && <p className='err'>{errors.imgOneUrl}</p>}

          <input type="url" placeholder='Image URL' className='spot-img' value={imgTwoUrl} onChange={(e) => setImgTwoUrl(e.target.value)} />
          {didSubmit && errors.imgTwoUrl && <p className='err'>{errors.imgTwoUrl}</p>}

          <input type="url" placeholder='Image URL' className='spot-img' value={imgThreeUrl} onChange={(e) => setImgThreeUrl(e.target.value)} />
          {didSubmit && errors.imgThreeUrl && <p className='err'>{errors.imgThreeUrl}</p>}

          <input type="url" placeholder='Image URL' className='spot-img' value={imgFourUrl} onChange={(e) => setImgFourUrl(e.target.value)} />
          {didSubmit && errors.imgFourUrl && <p className='err'>{errors.imgFourUrl}</p>}
        </div>

        <div className="button-box">
          <button type='submit'>Create Spot</button>
        </div>
      </div>
    </form>
  )
}

export default CreateSpot
