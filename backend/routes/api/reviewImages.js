const express = require('express');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User } = require('../../db/models');
const sequelize = require('sequelize');

const router = express.Router();

//DELETE REVIEW IMAGE BY ID
router.delete('/:imageId', requireAuth, async (req, res) => {
  const imageId = req.params.imageId;

  const reviewImg = await ReviewImage.findByPk(imageId, {
    include: [{
      model: Review,
      attributes: ['userId']
    }]
  });

  if (!reviewImg) {
    return res.status(404).json({ message: "Review image couldn't be found" });
  }

  if (reviewImg.Review.userId !== req.user.id) {
    return res.status(403).json({
      message: "The current user must own the review",
    });
  }

  await reviewImg.destroy();

  return res.status(200).json({ message: 'Successfully deleted' });
});











module.exports = router
