'use strict';

const { Booking } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        startDate: '2021-11-19',
        endDate: '2021-11-20'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2021-12-20',
        endDate: '2021-12-21'
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2022-11-21',
        endDate: '2022-11-22'
      },
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
