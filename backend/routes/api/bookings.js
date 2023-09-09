const express = require('express');
const moment = require('moment');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User, Booking } = require('../../db/models');
const sequelize = require('sequelize');

const router = express.Router();

//GET CURRENT USER BOOKINGS
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
      startDate: moment(bookingObj.startDate).format('YYYY-MM-DD'),
      endDate: moment(bookingObj.endDate).format('YYYY-MM-DD'),
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

//EDIT A BOOKING BY ID
router.put('/:bookingId', requireAuth, async (req, res) => {
  const { bookingId } = req.params;
  const userId = req.user.id;
  const { startDate, endDate } = req.body;

  const booking = await Booking.findByPk(bookingId);
  if (!booking || booking.userId !== userId) {
    return res.status(404).json({ message: "Booking couldn't be found" });
  }

  const spotId = booking.spotId;

  if (new Date(booking.endDate) < new Date()) {
    return res.status(403).json({ message: "Past bookings can't be modified" });
  }

  if (new Date(startDate) >= new Date(endDate)) {
    return res.status(400).json({
      message: "Bad Request",
      errors: {
        endDate: "endDate cannot come before startDate",
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

  const overlapBookings = overlap.filter(
    (existing) => existing.id !== bookingId
  );

  if (overlapBookings.length > 0) {
    return res.status(400).json({
      message: "Sorry, this spot is already booked for the specified dates",
      errors: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking",
      },
    });
  }

  await booking.update({
    startDate: moment(startDate).format('YYYY-MM-DD'),
    endDate: moment(endDate).format('YYYY-MM-DD')
  });

  return res.status(200).json(booking);
});


//DELETE BOOKING BY ID
router.delete('/:bookingId', requireAuth, async (req, res) => {
  const { bookingId } = req.params;
  const userId = req.user.id;

  const booking = await Booking.findByPk(bookingId);

  if (!booking || booking.userId !== userId) {
    return res.status(404).json({ message: "Booking couldn't be found" });
  }

  const currentDate = new Date();
  if (new Date(booking.startDate) <= currentDate) {
    return res.status(403).json({ message: "Bookings that have been started can't be deleted" });
  }

  await booking.destroy();

  return res.status(200).json({ message: "Successfully deleted" });
});










module.exports = router
