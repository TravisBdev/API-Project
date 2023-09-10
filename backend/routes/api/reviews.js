const express = require('express');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User } = require('../../db/models');
const sequelize = require('sequelize');

const router = express.Router();

const validateReview = [
  check('review').exists({ checkFalsy: true }).isLength({ min: 2, max: 255 }).withMessage('Review text is required'),
  check('stars').exists({ checkFalsy: true }).isInt({ min: 1, max: 5 }).withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
]

//GET ALL REVIEWS BY USER ID
router.get('/current', requireAuth, async (req, res) => {
  const reviews = await Review.findAll({
    where: { userId: req.user.id },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Spot,
        attributes: {
          exclude: ['description', 'createdAt', 'updatedAt']
        },
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

  if (req.user.id != review.userId) {
    res.status(403)
    return res.json({
      message: 'Review must belong to the current user'
    })
  }

  const imageCount = await ReviewImage.count({ where: { reviewId } });

  if (imageCount >= 10) {
    return res.status(403).json({ message: "Cannot add more than 10 images for a review" });
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
router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
  const reviewId = req.params.reviewId;
  const { review, stars } = req.body;

  const current = await Review.findByPk(reviewId);

  if (!current) {
    return res.status(404).json({ message: "Review couldn't be found" });
  }

  if (req.user.id != current.userId) {
    res.status(403)
    return res.json({
      message: 'Review must belong to the current user'
    })
  }

  current.review = review;
  current.stars = stars;

  await current.save();

  const reviewObj = current.toJSON()

  return res.status(200).json(reviewObj);
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
