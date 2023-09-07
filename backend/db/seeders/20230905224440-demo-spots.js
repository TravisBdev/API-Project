'use strict';

const { Spot } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '125 Smithers Lane',
        city: 'Sherwood',
        state: 'California',
        country: 'United States of America',
        lat: 37.7645542,
        lng: -137.7645542,
        name: 'The Smithers Estate',
        description: 'A little scary, but it will be fun',
        price: 420,
      },
      {
        ownerId: 1,
        address: '129 Makeshift Rd',
        city: 'Planeville',
        state: 'Iowa',
        country: 'United States of America',
        lat: 67.7845542,
        lng: -139.7645542,
        name: 'Crusty Kritter',
        description: 'It is a little crusty..',
        price: 500,
      },
      {
        ownerId: 3,
        address: '111 Only Ones Circle',
        city: 'Oneville',
        state: 'Oregon',
        country: 'United States of America',
        lat: 39.7645542,
        lng: -237.7645542,
        name: 'The One',
        description: 'It is the only one like it.',
        price: 111,
      },
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
