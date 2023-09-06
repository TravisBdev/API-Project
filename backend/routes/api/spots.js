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
    raw: true
  });

  res.json({ Spots: spots })
})

//get all spots owned by current user
router.get('/current', requireAuth, async (req, res, next) => {
  const userSpots = await Spot.findAll({
    where: { 'ownerId': req.user.id }
  })

  res.json(userSpots)
})

module.exports = router
