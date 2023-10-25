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

  const [country, setCountry] = useState(spot?.country)
  const [address, setAddress] = useState(spot?.address)
  const [city, setCity] = useState(spot?.city)
  const [state, setState] = useState(spot?.state)
  const [description, setDescription] = useState(spot?.description)
  const [name, setName] = useState(spot?.name)
  const [price, setPrice] = useState(spot?.price)
  const [previewImage, setPreviewImage] = useState(spot?.previewImage)
  const [img1, setImg1] = useState(spot?.img1)
  const [img2, setImg2] = useState(spot?.img2)
  const [img3, setImg3] = useState(spot?.img3)
  const [img4, setImg4] = useState(spot.img4)
  const [didSubmit, setDidSubmit] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})

  useEffect(() => {
    dispatch(getSpotDetails(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    const errorsObj = {}

    if (!country) errorsObj.country = 'Country is required'
    if (!address) errorsObj.address = 'Street address is required'
    if (!city) errorsObj.city = 'City is required'
    if (!state) errorsObj.state = 'State is required'
    if (description.length < 30) errorsObj.description = 'Description must be at least 30 characters'
    if (!description) errorsObj.description = 'Description is required'
    if (!name) errorsObj.name = 'Name is required'
    if (name.length > 50) errorsObj.name = 'Name must be less that 50 characters'
    if (!price) errorsObj.price = 'Price per day is required'
    if (!previewImage) errorsObj.previewImage = 'Preview image is required'
    if (previewImage && !previewImage.endsWith('.jpg') && !previewImage.endsWith('.png') && !previewImage.endsWith('.jpeg')) errorsObj.previewImage = 'Image URL must end in .png, .jpg, or .jpeg'
    if (img1 && !img1.endsWith('.jpg') && !img1.endsWith('.png') && !img1.endsWith('.jpeg')) errorsObj.img1 = 'Image URL must end in .png, .jpg, or .jpeg'
    if (img2 && !img2.endsWith('.jpg') && !img2.endsWith('.png') && !img2.endsWith('.jpeg')) errorsObj.img2 = 'Image URL must end in .png, .jpg, or .jpeg'
    if (img3 && !img3.endsWith('.jpg') && !img3.endsWith('.png') && !img3.endsWith('.jpeg')) errorsObj.img3 = 'Image URL must end in .png, .jpg, or .jpeg'
    if (img4 && !img4.endsWith('.jpg') && !img4.endsWith('.png') && !img4.endsWith('.jpeg')) errorsObj.img4 = 'Image URL must end in .png, .jpg, or .jpeg'

    setValidationErrors(errorsObj)

  }, [country, address, city, state, description, name, price, previewImage, img1, img2, img3, img4, spot])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDidSubmit(true)

    if (!Object.keys(validationErrors).length) {
      const data = {
        country,
        address,
        city,
        state,
        description,
        name,
        price,
        previewImage,
        img1,
        img2,
        img3,
        img4
      }


      const updatedSpot = await dispatch(updateASpot(spotId, data))
      if (updatedSpot) {
        history.push(`/spots/${updatedSpot.id}`)
      } else {
        const errors = updatedSpot.errors
        return errors
      }
    }
  }

  return (
    <form className="update-spot-form" onSubmit={handleSubmit}>
      <div className="header-box">
        <h1>Create a new Spot</h1>
        <h2>Where's your place located?</h2>
        <p>Guests will only get your exact address once they book a reservation.</p>
      </div>

      <div className="location-deets-box">
        <label htmlFor="country">Country</label>
        <input type="text" id='country' placeholder='Country' value={country} onChange={(e) => setCountry(e.target.value)} />
        {didSubmit && validationErrors.country && <div className="error">{validationErrors.country}</div>}

        <label htmlFor="address">Street Address</label>
        <input type="text" id='address' placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} />
        {didSubmit && validationErrors.address && <div className="error">{validationErrors.address}</div>}

        <div className="city-state-box">
          <label htmlFor="city">City</label>
          <input type="text" id='city' placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} />,
          {didSubmit && validationErrors.city && <div className="error">{validationErrors.city}</div>}

          <label htmlFor="state">State</label>
          <input type="text" id='state' placeholder='STATE' value={state} onChange={(e) => setState(e.target.value)} />
          {didSubmit && validationErrors.state && <div className="error">{validationErrors.state}</div>}
        </div>

        <div className="description-box">
          <h2>Describe your place to guests</h2>
          <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>

          <textarea name="" id="description" cols="30" rows="10" placeholder='Please write at least 30 characters' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          {didSubmit && validationErrors.description && <div className="error">{validationErrors.description}</div>}
        </div>

        <div className="title-box">
          <h2>Create a title for your spot</h2>
          <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>

          <input type="text" id='name' placeholder='Name of your spot' value={name} onChange={(e) => setName(e.target.value)} />
          {didSubmit && validationErrors.name && <div className="error">{validationErrors.name}</div>}
        </div>

        <div className="price-box">
          <h2>Set a base price for your spot</h2>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>

          $<input type="number" placeholder='Price per night (USD)' id='price' value={price} onChange={(e) => setPrice(e.target.value)} />
          {didSubmit && validationErrors.price && <div className="error">{validationErrors.price}</div>}
        </div>

        <div className="photo-box">
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>

          <input type="url" id='prev-img' placeholder='Preview Image URL' className='spot-img' value={previewImage} onChange={(e) => setPreviewImage(e.target.value)} />
          {didSubmit && validationErrors.previewImage && <div className="error">{validationErrors.previewImage}</div>}

          <input type="url" id='img1' placeholder='Image URL' className='spot-img' value={img1} onChange={(e) => setImg1(e.target.value)} />
          {didSubmit && validationErrors.img1 && <div className="error">{validationErrors.img1}</div>}

          <input type="url" id='img2' placeholder='Image URL' className='spot-img' value={img2} onChange={(e) => setImg2(e.target.value)} />
          {didSubmit && validationErrors.img2 && <div className="error">{validationErrors.img2}</div>}

          <input type="url" id='img3' placeholder='Image URL' className='spot-img' value={img3} onChange={(e) => setImg3(e.target.value)} />
          {didSubmit && validationErrors.img3 && <div className="error">{validationErrors.img3}</div>}

          <input type="url" id='img4' placeholder='Image URL' className='spot-img' value={img4} onChange={(e) => setImg4(e.target.value)} />
          {didSubmit && validationErrors.img4 && <div className="error">{validationErrors.img4}</div>}
        </div>

        <div className="button-box">
          <button type='submit'>Update Spot</button>
        </div>
      </div>
    </form>
  )
}

export default UpdateSpot
