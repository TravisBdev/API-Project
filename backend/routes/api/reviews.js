const express = require('express');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User } = require('../../db/models');
const sequelize = require('sequelize');

const router = express.Router();

//GET ALL REVIEWS BY USER ID
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
            where: { preview: true },
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

  const flatRev = reviews.map(review => {
    const revObj = review.toJSON();
    if (revObj.Spot.SpotImages[0]) {
      revObj.Spot.previewImage = revObj.Spot.SpotImages[0].url;
    }
    delete revObj.Spot.SpotImages;
    return revObj;
  });

  res.status(200).json({ Reviews: flatRev });

});

//CREATE REVIEW IMAGE BY REVIEW ID
router.post('/:reviewId/images', requireAuth, async (req, res) => {
  const reviewId = req.params.reviewId;
  const { url } = req.body;
  const review = await Review.findByPk(reviewId);

  if (!review) {
    return res.status(404).json({ message: "Review couldn't be found" });
  }

  const newImg = await ReviewImage.create({
    reviewId,
    url
  });

  return res.status(200).json({
    id: newImg.id,
    url: newImg.url
  });
});

//EDIT REVIEW BY REVIEW ID
router.put('/:reviewId', requireAuth, async (req, res) => {
  const reviewId = req.params.reviewId;
  const { review, stars } = req.body;

  const current = await Review.findByPk(reviewId);

  if (!current) {
    return res.status(404).json({ message: "Review couldn't be found" });
  }

  current.review = review;
  current.stars = stars;

  await current.save();

  return res.status(200).json({
    review: current.review,
    stars: current.stars,
  });
});

//DELETE REVIEW BY REVIEW ID
router.delete('/:reviewId', requireAuth, async (req, res) => {
  const reviewId = req.params.reviewId;
  const review = await Review.findByPk(reviewId);

  if (!review) {
    return res.status(404).json({ message: "Review couldn't be found" });
  }

  await review.destroy();

  return res.status(200).json({ message: 'Successfully deleted' });
});











module.exports = router
