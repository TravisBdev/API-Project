const express = require('express');
const moment = require('moment');
const { Op } = require('sequelize');
const { check, query, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');
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

const deciValidator = () => {
  return value => {
    const regex = /^-?\d{1,3}\.\d{1,7}$/;
    if (!regex.test(value)) {
      throw new Error('Invalid decimal format');
    }
    return true;
  };
};

const queryValidations = [
  query('page').optional().isInt({ min: 1, max: 10 }).withMessage('Page must be greater than or equal to 1'),
  query('size').optional().isInt({ min: 1, max: 20 }).withMessage('Size must be greater than or equal to 1'),
  query('minLat').optional().custom(deciValidator()).withMessage('Minimum latitude is invalid'),
  query('maxLat').optional().custom(deciValidator()).withMessage('Maximum latitude is invalid'),
  query('minLng').optional().custom(deciValidator()).withMessage('Minimum longitude is invalid'),
  query('maxLng').optional().custom(deciValidator()).withMessage('Maximum longitude is invalid'),
  query('minPrice').optional().isFloat({ min: 0 }).withMessage('Minimum price must be greater than or equal to 0'),
  query('maxPrice').optional().isFloat({ min: 0 }).withMessage('Maximum price must be greater than or equal to 0'),
  handleValidationErrors
]


//GET ALL SPOTS
router.get('/', queryValidations, async (req, res) => {

  let page = 1;
  let size = 20;

  if (req.query.page) {
    page = parseInt(req.query.page);
  }

  if (req.query.size) {
    size = parseInt(req.query.size);
  }

  const where = {};

  if (req.query.minLat && req.query.maxLat) {
    where.lat = { [Op.between]: [parseFloat(req.query.minLat), parseFloat(req.query.maxLat)] };
  }

  if (req.query.minLng && req.query.maxLng) {
    where.lng = { [Op.between]: [parseFloat(req.query.minLng), parseFloat(req.query.maxLng)] };
  }

  if (req.query.minPrice) {
    where.price = { [Op.gte]: parseFloat(req.query.minPrice) };
  }

  if (req.query.maxPrice) {
    where.price = { [Op.lte]: parseFloat(req.query.maxPrice) };
  }

  const spots = await Spot.findAll({
    where,
    limit: size,
    offset: (page - 1) * size,
    include: [{ model: Review }, { model: SpotImage }],
  });

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
}
);


//GET ALL SPOTS OWNED BY CURRENT USER
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

const validateReview = [
  check('review').exists({ checkFalsy: true }).isLength({ min: 2, max: 255 }).withMessage('Review text is required'),
  check('stars').exists({ checkFalsy: true }).isInt({ min: 1, max: 5 }).withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
]

const spotValidation = [
  check('address').exists({ checkFalsy: true }).withMessage('Street address is required'),
  check('city').exists({ checkFalsy: true }).withMessage('City is required'),
  check('state').exists({ checkFalsy: true }).withMessage('State is required'),
  check('country').exists({ checkFalsy: true }).withMessage('Country is required'),
  check('name').exists({ checkFalsy: true }).isLength({ min: 2, max: 49 }).withMessage('Name must be less than 50 characters'),
  check('description').exists({ checkFalsy: true }).withMessage('Description is required'),
  check('price').exists({ checkFalsy: true }).withMessage('Price per day is required'),
  handleValidationErrors
]



//CREATE A SPOT
router.post('/', requireAuth, spotValidation, async (req, res) => {
  const { address, city, state, country, name, description, price } = req.body
  const makeSpot = await Spot.create({
    ownerId: req.user.id,
    address,
    city,
    state,
    country,
    name,
    description,
    price
  })
  if (!makeSpot) {
    return res.status(400).json()
  }
  res.status(201).json(makeSpot)
})

//GET BOOKINGS BY SPOT ID
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
  const spotId = req.params.spotId;

  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  const bookings = await Booking.findAll({
    where: { spotId: spotId },
    include: [{ model: User, attributes: ['id', 'firstName', 'lastName'] }]
  });

  const isOwner = req.user && req.user.id === spot.ownerId;

  let results = {
    Bookings: []
  };

  for (let booking of bookings) {
    let data = {};

    if (isOwner) {
      data.User = {
        id: booking.User.id,
        firstName: booking.User.firstName,
        lastName: booking.User.lastName
      };

      data.id = booking.id;
      data.spotId = booking.spotId;
      data.userId = booking.userId;
      data.startDate = booking.startDate.toISOString().replace('T', ' ').split('.')[0].split(' ')[0];
      data.endDate = booking.endDate.toISOString().replace('T', ' ').split('.')[0].split(' ')[0];
      data.createdAt = booking.createdAt;
      data.updatedAt = booking.updatedAt;
    } else {
      data.spotId = booking.spotId;
      data.startDate = booking.startDate.toISOString().replace('T', ' ').split('.')[0].split(' ')[0];
      data.endDate = booking.endDate.toISOString().replace('T', ' ').split('.')[0].split(' ')[0];
    }

    results.Bookings.push(data);
  }

  res.json(results);
});

//ADD IMAGE TO SPOT BY SPOT ID
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  const { url, preview } = req.body;

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  if (req.user.id != spot.ownerId) {
    res.status(403)
    return res.json({
      message: 'Spot must belong to the current user'
    })
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

//GET REVIEWS BY SPOT ID
router.get('/:spotId/reviews', async (req, res) => {
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  const reviews = await Review.findAll({
    where: { spotId },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName'],
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url'],
      },
    ],
  });

  return res.json({ Reviews: reviews });
});

//CREATE BOOKING BY SPOT ID
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
  const spotId = req.params.spotId;
  const userId = req.user.id;
  const { startDate, endDate } = req.body;

  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  if (spot.ownerId === userId) {
    return res.status(403).json({ message: "You must not own the spot" });
  }


  if (new Date(startDate) >= new Date(endDate)) {
    return res.status(400).json({
      message: "Bad Request",
      errors: {
        endDate: "endDate cannot be on or before startDate",
      },
    });
  }


  const overlap = await Booking.findAll({
    where: {
      spotId: spotId,
      [Op.or]: [
        {
          startDate: {
            [Op.between]: [new Date(startDate), new Date(endDate)],
          },
        },
        {
          endDate: {
            [Op.between]: [new Date(startDate), new Date(endDate)],
          },
        },
      ],
    },
  });

  if (overlap.length > 0) {
    return res.status(403).json({
      message: "Sorry, this spot is already booked for the specified dates",
      errors: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking",
      },
    });
  }

  const newBooking = await Booking.create({
    spotId: spotId,
    userId: userId,
    startDate: startDate,
    endDate: endDate,
  });

  res.status(200).json({
    id: newBooking.id,
    spotId: newBooking.spotId,
    userId: newBooking.userId,
    startDate: newBooking.startDate.toISOString().replace('T', ' ').split('.')[0].split(' ')[0],
    endDate: newBooking.endDate.toISOString().replace('T', ' ').split('.')[0].split(' ')[0],
    createdAt: newBooking.createdAt,
    updatedAt: newBooking.updatedAt,
  });
});

//CREATE REVIEW BY SPOT ID
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
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
    return res.json({
      message: 'User already has a review for this spot'
    })
  }

  const newReview = await Review.create({
    spotId,
    userId,
    review,
    stars
  });
  console.log(newReview.id)

  res.status(201).json(newReview)

})


//GET DETAILS OF SPOT BY ID
router.get('/:spotId', async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    include: [{ model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName'] },
    { model: Review },
    { model: SpotImage, attributes: ['id', 'preview', 'url'] }]
  })

  if (!spot) {
    res.status(404)
    return res.json({
      message: "Spot couldn't be found"
    })
  }

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

//EDIT SPOT BY ID
router.put('/:spotId', requireAuth, spotValidation, async (req, res) => {
  const changeSpot = await Spot.findByPk(req.params.spotId)
  const { address, city, state, country, lat, lng, name, description, price } = req.body

  if (!changeSpot) {
    res.status(404)
    return res.json({
      message: "Spot couldn't be found"
    })
  }

  if (req.user.id != changeSpot.ownerId) {
    res.status(403)
    return res.json({
      message: 'Spot must belong to the current user'
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


//DELETE SPOT BY ID
router.delete('/:spotId', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId)
  if (!spot) {
    res.status(404)
    return res.json({
      message: "Spot couldn't be found"
    })
  }

  if (spot.ownerId != req.user.id) {
    return res.status(403).json({ message: 'Not authorized to delete this spot' });
  }

  await spot.destroy()

  return res.status(200).json({
    "message": "Successfully deleted"
  })
})

module.exports = router
