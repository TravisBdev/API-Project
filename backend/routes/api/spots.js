const express = require('express');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, SpotImage, Review, User } = require('../../db/models');
const sequelize = require('sequelize');

const router = express.Router();

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

//get all spots
router.get('/', async (req, res,) => {
  const spots = await Spot.findAll({
    include: [{ model: Review }, { model: SpotImage }]
  })

  let spotsList = []
  for (let spot of spots) {
    spotsList.push(spot.toJSON())
  }
  spotsList.forEach(spot => {
    let stars = []
    spot.Reviews.forEach(review => {
      stars.push(review.stars)
    })

    let sum = 0
    for (let star of stars) {
      sum += star
    }
    let avg = sum / stars.length
    spot.avgRating = avg
    delete spot.Reviews
  })

  for (let spot of spotsList) {
    spot.SpotImages.forEach(img => {
      if (img.preview) {
        spot.previewImage = img.url
        delete spot.SpotImages
      }
    })
  }

  res.json({ Spots: spotsList })


})


//get all spots owned by current user
router.get('/current', requireAuth, async (req, res,) => {
  const spots = await Spot.findAll({
    where: { ownerId: req.user.id },
    include: [{ model: Review }, { model: SpotImage }]
  })

  let spotsList = []

  for (let spot of spots) {
    spotsList.push(spot.toJSON())
  }

  spotsList.forEach(spot => {
    let stars = []
    spot.Reviews.forEach(review => {
      stars.push(review.stars)
    })

    let sum = 0
    for (let star of stars) {
      sum += star
    }
    let avg = sum / stars.length
    spot.avgRating = avg
    delete spot.Reviews
  })

  for (let spot of spotsList) {
    spot.SpotImages.forEach(img => {
      if (img.preview) {
        spot.previewImage = img.url
        delete spot.SpotImages
      }
    })
  }

  res.json({ Spots: spotsList })

})

const spotValidation = [
  check('address').exists({ checkFalsy: true }).withMessage('Street address is required'),
  check('city').exists({ checkFalsy: true }).withMessage('City is required'),
  check('state').exists({ checkFalsy: true }).withMessage('State is required'),
  check('country').exists({ checkFalsy: true }).withMessage('Country is required'),
  check('lat').exists({ checkFalsy: true }).isFloat().withMessage('Latitude is not valid'),
  check('lng').exists({ checkFalsy: true }).isFloat().withMessage('Longitude is not valid'),
  check('name').exists({ checkFalsy: true }).isLength({ min: 2, max: 49 }).withMessage('Name must be less than 50 characters'),
  check('description').exists({ checkFalsy: true }).withMessage('Description is required'),
  check('price').exists({ checkFalsy: true }).withMessage('Price per day is required'),
  handleValidationErrors
]


//create a spot
router.post('/', requireAuth, spotValidation, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price, ownerId } = req.body
  const makeSpot = await Spot.create({
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  })
  if (!makeSpot) {
    return res.status(400).json()
  }
  res.status(201)
    .json(makeSpot)
})

//add image to spot based on spot ID
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  const { url, preview } = req.body;

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  const newImg = await SpotImage.create({
    spotId: spot.id,
    url,
    preview,
  });

  if (newImg) {
    return res.status(200).json({
      id: newImg.id,
      url: newImg.url,
      preview: newImg.preview,
    });
  }
})

//create review based on spot ID
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { review, stars } = req.body;
  const userId = req.user.id;

  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({ errors: { message: "Spot couldn't be found." } });
  }

  const exists = await Review.findOne({
    where: {
      spotId,
      userId
    }
  })

  if (exists) {
    res.status(500)
    return res.json('User already has a review for this spot')
  }

  // Create a new review
  const newReview = await Review.create({
    spotId,
    userId,
    review,
    stars
  });
  console.log(newReview.id)

  res.status(201).json(newReview)

})


//get details of spot by id
router.get('/:spotId', async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    include: [{ model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName'] },
    { model: Review },
    { model: SpotImage, attributes: ['id', 'preview', 'url'] }]
  })
  const spotObj = spot.toJSON()

  let stars = []
  let reviews = 0

  spotObj.Reviews.forEach(rev => {
    stars.push(rev.stars)
    reviews++
  })

  let sum = 0
  for (let star of stars) {
    sum += star
  }
  let avg = sum / stars.length
  spotObj.numReviews = reviews
  spotObj.avgRating = avg

  delete spotObj.Reviews

  res.json(spotObj)
})

//edit a spot based on ID
router.put('/:spotId', requireAuth, spotValidation, async (req, res) => {
  const changeSpot = await Spot.findByPk(req.params.spotId)
  const { address, city, state, country, lat, lng, name, description, price } = req.body
  console.log(req.user.id, changeSpot.ownerId);
  if (!changeSpot) {
    res.status(404)
    return res.json({
      message: "Spot couldn't be found"
    })
  }

  changeSpot.address = address;
  changeSpot.city = city;
  changeSpot.state = state;
  changeSpot.country = country;
  changeSpot.lat = lat;
  changeSpot.lng = lng;
  changeSpot.name = name;
  changeSpot.description = description;
  changeSpot.price = price;

  await changeSpot.save();

  return res.status(200).json(changeSpot);
})


//delete a spot based on ID
router.delete('/:spotId', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId)
  if (!spot) {
    res.status(404)
    return res.json({
      message: "Spot couldn't be found"
    })
  }

  await spot.destroy()

  return res.status(200).json({
    "message": "Successfully deleted"
  })
})

module.exports = router
