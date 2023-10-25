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
        url: 'https://cdn.pixabay.com/photo/2018/08/24/19/14/castle-3628643_1280.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://cdn.pixabay.com/photo/2017/11/10/03/48/fantasy-2935246_1280.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://cdn.pixabay.com/photo/2017/11/10/03/48/fantasy-2935246_1280.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://cdn.pixabay.com/photo/2020/02/16/16/31/mystical-4854108_1280.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://cdn.pixabay.com/photo/2018/02/13/23/41/nature-3151869_1280.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://cdn.pixabay.com/photo/2017/11/07/00/07/fantasy-2925250_1280.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://cdn.pixabay.com/photo/2017/10/13/14/15/fantasy-2847724_1280.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://cdn.pixabay.com/photo/2015/04/23/21/59/hot-air-balloon-736879_1280.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://cdn.pixabay.com/photo/2018/05/12/17/41/forest-3394066_1280.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://cdn.pixabay.com/photo/2019/05/24/17/41/castle-4226797_1280.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://cdn.pixabay.com/photo/2020/06/19/23/48/wormhole-5319178_1280.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_1280.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_1280.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://cdn.pixabay.com/photo/2018/03/29/19/34/northern-lights-3273425_1280.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://cdn.pixabay.com/photo/2021/05/22/22/35/black-hole-6274731_1280.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://cdn.pixabay.com/photo/2018/11/07/13/28/mushroom-3800390_1280.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_1280.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_1280.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://cdn.pixabay.com/photo/2018/08/21/23/29/forest-3622519_1280.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://cdn.pixabay.com/photo/2017/02/08/17/24/fantasy-2049567_1280.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://cdn.pixabay.com/photo/2015/05/24/16/47/fantasy-782001_1280.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://cdn.pixabay.com/photo/2018/04/10/23/46/architecture-3309203_1280.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://cdn.pixabay.com/photo/2020/08/23/14/55/castle-5511046_1280.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://cdn.pixabay.com/photo/2018/10/05/22/36/metal-3726995_1280.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://cdn.pixabay.com/photo/2020/06/22/10/40/hohenzollern-5328719_1280.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://cdn.pixabay.com/photo/2020/11/15/09/21/castle-5745011_1280.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://cdn.pixabay.com/photo/2021/12/28/11/37/castle-6899042_1280.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://cdn.pixabay.com/photo/2018/10/13/08/39/hohenschwangau-3743780_1280.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://cdn.pixabay.com/photo/2022/01/03/01/00/ruins-6911495_1280.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://cdn.pixabay.com/photo/2020/09/04/18/15/pond-5544602_1280.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://cdn.pixabay.com/photo/2014/06/03/18/23/summer-361419_1280.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://cdn.pixabay.com/photo/2015/01/28/23/35/hills-615429_1280.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://cdn.pixabay.com/photo/2020/04/28/02/23/river-5102361_1280.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://cdn.pixabay.com/photo/2021/08/13/14/16/outdoors-6543215_1280.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://cdn.pixabay.com/photo/2022/12/29/18/11/house-7685542_1280.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://cdn.pixabay.com/photo/2023/01/03/17/04/haunted-7694841_1280.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://cdn.pixabay.com/photo/2021/10/29/13/39/fantasy-6751966_1280.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://cdn.pixabay.com/photo/2018/03/18/15/26/villa-3237114_1280.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://cdn.pixabay.com/photo/2017/02/25/09/51/full-moon-2097326_1280.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://cdn.pixabay.com/photo/2021/04/08/07/43/castle-6160929_1280.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://cdn.pixabay.com/photo/2023/06/15/19/42/castle-8066410_1280.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://cdn.pixabay.com/photo/2022/12/10/04/35/stairs-7646580_1280.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://cdn.pixabay.com/photo/2020/04/11/18/51/composing-5031598_1280.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://cdn.pixabay.com/photo/2015/04/22/17/34/middle-ages-735063_1280.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://cdn.pixabay.com/photo/2018/05/04/07/55/snow-3373432_1280.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://cdn.pixabay.com/photo/2017/01/09/00/49/snow-1964361_1280.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://cdn.pixabay.com/photo/2016/12/06/14/33/log-cabin-1886620_1280.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://cdn.pixabay.com/photo/2018/05/04/15/27/cabin-3374201_1280.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://cdn.pixabay.com/photo/2017/01/30/15/35/autumn-2021154_1280.jpg',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://cdn.pixabay.com/photo/2017/09/15/02/22/fantasy-2750995_1280.jpg',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://cdn.pixabay.com/photo/2018/11/08/11/34/milky-way-3802391_1280.jpg',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://cdn.pixabay.com/photo/2016/11/18/17/02/cave-1835825_1280.jpg',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://cdn.pixabay.com/photo/2017/08/07/23/11/iceland-2608985_1280.jpg',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://cdn.pixabay.com/photo/2017/08/07/14/57/cave-2604672_1280.jpg',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://cdn.pixabay.com/photo/2019/03/02/19/50/log-cabin-4030556_1280.jpg',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://cdn.pixabay.com/photo/2017/08/17/09/35/log-cabin-2650560_1280.jpg',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://cdn.pixabay.com/photo/2020/05/28/08/24/chicken-coop-5230394_1280.jpg',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://cdn.pixabay.com/photo/2020/05/06/03/46/hill-5136002_1280.jpg',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://cdn.pixabay.com/photo/2013/07/04/18/33/western-143213_1280.jpg',
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
