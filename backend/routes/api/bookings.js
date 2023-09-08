const express = require('express');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User, Booking } = require('../../db/models');
const sequelize = require('sequelize');

const router = express.Router();


router.get('/current', requireAuth, async (req, res) => {
  const userId = req.user.id;

  const bookings = await Booking.findAll({
    where: { userId },
    include: [
      {
        model: Spot,
        attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],  // specify attributes to include
        include: [
          {
            model: SpotImage,
            attributes: ['url', 'preview']
          }
        ]
      }
    ],
  });

  const output = bookings.map(booking => {
    const bookingObj = booking.get({ plain: true });
    const spot = bookingObj.Spot;

    if (spot.SpotImages && spot.SpotImages.length > 0) {
      for (let img of spot.SpotImages) {
        if (img.preview) {
          spot.previewImage = img.url;
          break;
        }
      }
    }
    delete spot.SpotImages;

    return {
      id: bookingObj.id,
      spotId: bookingObj.spotId,
      Spot: spot,
      userId: bookingObj.userId,
      startDate: bookingObj.startDate,
      endDate: bookingObj.endDate,
      createdAt: bookingObj.createdAt,
      updatedAt: bookingObj.updatedAt
    };
  });

  if (output.length > 0) {
    res.status(200).json({ Bookings: output });
  } else {
    res.status(404).json({ message: "No bookings found" });
  }


});

//get booking by spot ID
router.get('/bookings/:spotId', requireAuth, async (req, res) => {
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

  let res = {
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
      data.startDate = booking.startDate;
      data.endDate = booking.endDate;
      data.createdAt = booking.createdAt;
      data.updatedAt = booking.updatedAt;
    } else {
      data.spotId = booking.spotId;
      data.startDate = booking.startDate;
      data.endDate = booking.endDate;
    }

    res.Bookings.push(data);
  }

  res.json(res);
});












module.exports = router
