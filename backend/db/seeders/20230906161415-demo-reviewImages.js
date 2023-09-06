'use strict';

const { ReviewImage } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: 'img url',
      },
      {
        reviewId: 2,
        url: 'img url',
      },
      {
        reviewId: 3,
        url: 'img url',
      },

    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'reviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
