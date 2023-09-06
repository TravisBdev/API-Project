'use strict';

const { Review } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        review: 'It was awesome!',
        stars: 5,
      },
      {
        spotId: 2,
        userId: 2,
        review: 'It was ok.',
        stars: 3,
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Meh...',
        stars: 1,
      },

    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
