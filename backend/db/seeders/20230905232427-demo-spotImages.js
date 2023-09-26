'use strict';

const { SpotImage } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/383403441.jpg?k=0d70432ce7823f8c3db9ab7f5f71776f2c2d1ea51894802ef3932f147d0cdcfe&o=&hp=1',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://images.rezfusion.com/evrn/PINNAC/186135/1988780924.jpg?optimize=true&rotate=true&quality=70&width=1600',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://www.christiesrealestate.com/blog/wp-content/uploads/2021/12/river-house-estate-telkwa-british-columbia-1.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://www.wideopencountry.com/wp-content/uploads/sites/4/2017/07/cabin1-4-e1501545347988.jpg?fit=798%2C546',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://cariboucreek.com/wp-content/uploads/2021/06/06-1001-25_PaintedRoseReshoot-12-1024x679.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-559300795536382220/original/bcf9680c-1812-4f29-83ee-0ba8e22afb2c.jpeg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://www.surforsound.com/media/3340016/surf-or-sound-realty-salty-dog-beach-house-869-exterior.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://st.hzcdn.com/simgs/pictures/exteriors/coastal-modern-lindye-galloway-interiors-img~81a13ab90a1491bc_14-9834-1-1ab483e.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://st.hzcdn.com/simgs/pictures/exteriors/coastal-living-magazine-showhouse-flagg-coastal-homes-img~92016b0c03bc6203_14-1565-1-5c6b0ec.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://0b20c523c2fb4534974b-bba8e2887a970ab975191df49b6d9e46.ssl.cf5.rackcdn.com/gallery/134/884929-IMG_1093.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://bostonpads.com/wp-content/uploads/2017/11/boston-luxury-apartment-waterfront.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://st.hzcdn.com/simgs/pictures/living-rooms/luxury-apartment-design-by-massimiliano-raggi-with-products-by-oasis-group-oasis-img~843177c6054207d5_14-7265-1-eb8b570.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://www.thewoodlands.com/wp-content/uploads/2022/01/The-Grove-at-Creekside-Park-2843.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://resource.rentcafe.com/image/upload/q_auto,f_auto,c_lfill,w_361,h_400,g_auto/s3/2/143212/aurora-9896-web%20(2).jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://photos.zillowstatic.com/fp/da632dbbb1d5c317359c003dede8ef50-p_e.jpg',
        preview: true
      },

    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
