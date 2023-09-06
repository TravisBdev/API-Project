const express = require('express');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, SpotImage, Booking, Review } = require('../../db/models');
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
router.get('/', async (req, res, next) => {
  const spots = await Spot.findAll({
    include: [
      {
        model: SpotImage,
        attributes: ['url'],
      },
      {
        model: Review,
        attributes: [
          [sequelize.fn('avg', sequelize.col('stars')), 'avgRating'],
        ],
      },
    ],
  });
  const resSpots = spots.map((spot) => ({
    id: spot.id,
    ownerId: spot.ownerId,
    address: spot.address,
    city: spot.city,
    state: spot.state,
    country: spot.country,
    lat: spot.lat,
    lng: spot.lng,
    name: spot.name,
    description: spot.description,
    price: spot.price,
    avgRating: spot.Reviews[0].dataValues.avgRating,
    previewImage: spot.SpotImages[0].url
  }));

  res.json({ Spots: resSpots })
})

//get all spots owned by current user
router.get('/current', requireAuth, async (req, res, next) => {
  const userSpots = await Spot.findAll({
    where: { 'ownerId': req.user.id },
    include: [
      {
        model: SpotImage,
        attributes: ['url'],
      },
      {
        model: Review,
        attributes: [
          [sequelize.fn('avg', sequelize.col('stars')), 'avgRating'],
        ],
      },
    ],
  })
  const resUserSpots = userSpots.map((spot) => ({
    id: spot.id,
    ownerId: spot.ownerId,
    address: spot.address,
    city: spot.city,
    state: spot.state,
    country: spot.country,
    lat: spot.lat,
    lng: spot.lng,
    name: spot.name,
    description: spot.description,
    price: spot.price,
    avgRating: spot.Reviews[0].dataValues.avgRating,
    previewImage: spot.SpotImages[0].url
  }));

  res.json(resUserSpots)
})

module.exports = router
