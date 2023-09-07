const express = require('express');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User } = require('../../db/models');
const sequelize = require('sequelize');

const router = express.Router();


router.get('/current', requireAuth, async (req, res) => {
  const reviews = await Review.findAll({
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Spot,
        include: [
          {
            model: SpotImage,
            attributes: ['url'],
          }
        ]
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  });

  res.status(200).json({ Reviews: reviews });

});


























module.exports = router
