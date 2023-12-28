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
        address: '125 Encers Lane',
        city: 'Enchanted City',
        state: 'Elders',
        country: 'Encers',
        lat: 37.7645542,
        lng: -137.7645542,
        name: 'Wringcaster Hold',
        description: 'Wringcaster Hold beckons the bold with its towering stone spires and slate roofs, a fortress cradled by swirling mists and thunderous clouds. Within its ancient walls, crimson light whispers of age-old secrets, casting an otherworldly glow. This enigmatic castle, suspended between tempest and tranquility, offers a haven for those seeking respite from the mundane, promising an experience steeped in mystery and the echoes of forgotten epochs. Here, every stone tells a story, and every shadow may hold a new tale waiting to be discovered by the curious traveler.',
        price: 420,
      },
      {
        ownerId: 1,
        address: '129 Makeshift Rd',
        city: 'Misty City',
        state: 'Misest',
        country: 'Coloot',
        lat: 67.7845542,
        lng: -139.7645542,
        name: 'Uwile',
        description: "In the heart of the icy expanse of Uwile, a monolithic sculpture carved by the winds of time stands guard. This colossal figure, draped in a cloak of eternal frost, towers over the silent tundra, a silent sentinel beneath the watchful gaze of the pale moon. Its presence is both a beacon and a mystery to the line of adventurers that trek across the snow-dusted plains. Uwile's icy grasp promises a serene yet thrilling escape where the whispers of ancient spirits dance with the howling blizzard, inviting the bravest souls to uncover its frozen secrets.",
        price: 500,
      },
      {
        ownerId: 1,
        address: '404 Exception Lane',
        city: 'The Void',
        state: 'Eternal Night',
        country: 'Deeowl',
        lat: 67.7845542,
        lng: -139.7645542,
        name: 'Tortmain Hold',
        description: 'Venture into the enigmatic realms of Tortmain Hold, a portal where the fabric of reality yields to the cosmic dance of time and space. Swirling nebulas and the shimmer of stars beckon from the event horizon, offering a passage to the unknown. This celestial vortex, suspended in the velvet darkness, is a gateway for the intrepid, a crossing for souls daring to explore beyond the edges of the universe. Here, the very essence of adventure and discovery spirals into infinity, inviting travelers to step through and embrace the vastness of the cosmos.',
        price: 404,
      },
      {
        ownerId: 1,
        address: '201 Timber Drive',
        city: 'Greake',
        state: 'Collow',
        country: 'Mageaf',
        lat: 67.7845542,
        lng: -139.7645542,
        name: 'Tortmain Hold',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione commodi numquam tempore quibusdam aspernatur exercitationem alias laudantium, officia blanditiis nesciunt consequatur, dignissimos dolor et ducimus molestiae at! Earum, itaque quod.sed eveniet est quibusdam, praesentium itaque, vel iusto rem rerum laborum nostrum labore facere quasi voluptas asperiores? Quidem eius deleniti recusandae eaque magni quo harum maiores aliquid. Ad, sequi?Consequuntur ipsam quam commodi nam nemo libero quod quaerat maiores consectetur perspiciatis impedit repellat, temporibus porro dolores pariatur, sunt voluptates rerum ipsum dolorem voluptatibus harum eum! Non suscipit ratione enim!',
        price: 404,
      },
      {
        ownerId: 2,
        address: '777 Broxi Place',
        city: 'Azunche',
        state: 'Silxie',
        country: 'Giagel',
        lat: 67.7845542,
        lng: -139.7645542,
        name: 'Berlington Stowe',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione commodi numquam tempore quibusdam aspernatur exercitationem alias laudantium, officia blanditiis nesciunt consequatur, dignissimos dolor et ducimus molestiae at! Earum, itaque quod.sed eveniet est quibusdam, praesentium itaque, vel iusto rem rerum laborum nostrum labore facere quasi voluptas asperiores? Quidem eius deleniti recusandae eaque magni quo harum maiores aliquid. Ad, sequi?Consequuntur ipsam quam commodi nam nemo libero quod quaerat maiores consectetur perspiciatis impedit repellat, temporibus porro dolores pariatur, sunt voluptates rerum ipsum dolorem voluptatibus harum eum! Non suscipit ratione enim!',
        price: 303,
      },
      {
        ownerId: 2,
        address: '834 Greter Terrace',
        city: 'Mudten',
        state: 'Griish',
        country: 'Hazeaf',
        lat: 67.7845542,
        lng: -139.7645542,
        name: 'Capvering East',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione commodi numquam tempore quibusdam aspernatur exercitationem alias laudantium, officia blanditiis nesciunt consequatur, dignissimos dolor et ducimus molestiae at! Earum, itaque quod.sed eveniet est quibusdam, praesentium itaque, vel iusto rem rerum laborum nostrum labore facere quasi voluptas asperiores? Quidem eius deleniti recusandae eaque magni quo harum maiores aliquid. Ad, sequi?Consequuntur ipsam quam commodi nam nemo libero quod quaerat maiores consectetur perspiciatis impedit repellat, temporibus porro dolores pariatur, sunt voluptates rerum ipsum dolorem voluptatibus harum eum! Non suscipit ratione enim!',
        price: 300,
      },
      {
        ownerId: 2,
        address: '1321 Rusnix Court',
        city: 'Rusger',
        state: 'Forgel',
        country: 'Ancnix',
        lat: 67.7845542,
        lng: -139.7645542,
        name: 'Tharfield Lowes',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione commodi numquam tempore quibusdam aspernatur exercitationem alias laudantium, officia blanditiis nesciunt consequatur, dignissimos dolor et ducimus molestiae at! Earum, itaque quod.sed eveniet est quibusdam, praesentium itaque, vel iusto rem rerum laborum nostrum labore facere quasi voluptas asperiores? Quidem eius deleniti recusandae eaque magni quo harum maiores aliquid. Ad, sequi?Consequuntur ipsam quam commodi nam nemo libero quod quaerat maiores consectetur perspiciatis impedit repellat, temporibus porro dolores pariatur, sunt voluptates rerum ipsum dolorem voluptatibus harum eum! Non suscipit ratione enim!',
        price: 700,
      },
      {
        ownerId: 2,
        address: '711 Magton Place',
        city: 'Ancbath',
        state: 'Grerid',
        country: 'Ancnix',
        lat: 67.7845542,
        lng: -139.7645542,
        name: 'Clapton Appley',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione commodi numquam tempore quibusdam aspernatur exercitationem alias laudantium, officia blanditiis nesciunt consequatur, dignissimos dolor et ducimus molestiae at! Earum, itaque quod.sed eveniet est quibusdam, praesentium itaque, vel iusto rem rerum laborum nostrum labore facere quasi voluptas asperiores? Quidem eius deleniti recusandae eaque magni quo harum maiores aliquid. Ad, sequi?Consequuntur ipsam quam commodi nam nemo libero quod quaerat maiores consectetur perspiciatis impedit repellat, temporibus porro dolores pariatur, sunt voluptates rerum ipsum dolorem voluptatibus harum eum! Non suscipit ratione enim!',
        price: 700,
      },
      {
        ownerId: 2,
        address: 'Blorid',
        city: 'Brorich',
        state: 'Rotwich',
        country: 'Misdon',
        lat: 67.7845542,
        lng: -139.7645542,
        name: 'Cainhorn Keep',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione commodi numquam tempore quibusdam aspernatur exercitationem alias laudantium, officia blanditiis nesciunt consequatur, dignissimos dolor et ducimus molestiae at! Earum, itaque quod.sed eveniet est quibusdam, praesentium itaque, vel iusto rem rerum laborum nostrum labore facere quasi voluptas asperiores? Quidem eius deleniti recusandae eaque magni quo harum maiores aliquid. Ad, sequi?Consequuntur ipsam quam commodi nam nemo libero quod quaerat maiores consectetur perspiciatis impedit repellat, temporibus porro dolores pariatur, sunt voluptates rerum ipsum dolorem voluptatibus harum eum! Non suscipit ratione enim!',
        price: 900,
      },
      {
        ownerId: 3,
        address: '111 Suford Road',
        city: 'Oneville',
        state: 'Salco',
        country: 'Fornila',
        lat: 39.7645542,
        lng: -237.7645542,
        name: 'The One',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt aliquid obcaecati eos debitis commodi accusantium provident quam nesciunt nobis odit modi alias impedit unde temporibus, iure et? Similique, fuga nostrum. Animi voluptates facilis architecto accusamus soluta impedit consectetur dolorum. Fugiat explicabo dolore quaerat itaque iusto ex nobis expedita esse harum commodi? Voluptatem doloremque ut eum cum eaque, iure rerum fugit.',
        price: 111,
      },
      {
        ownerId: 3,
        address: '2112 Dardif Pit',
        city: 'DeepBriar',
        state: 'Onymouth',
        country: 'Bronila',
        lat: 49.7645542,
        lng: -237.7645542,
        name: 'Tarnton Wray',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt aliquid obcaecati eos debitis commodi accusantium provident quam nesciunt nobis odit modi alias impedit unde temporibus, iure et? Similique, fuga nostrum. Animi voluptates facilis architecto accusamus soluta impedit consectetur dolorum. Fugiat explicabo dolore quaerat itaque iusto ex nobis expedita esse harum commodi? Voluptatem doloremque ut eum cum eaque, iure rerum fugit.',
        price: 211,
      },
      {
        ownerId: 3,
        address: '210 Blobury Lane',
        city: 'Enckesh',
        state: 'Moldee',
        country: 'Hazto',
        lat: 49.7645542,
        lng: -237.7645542,
        name: 'Tarnton Wray',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt aliquid obcaecati eos debitis commodi accusantium provident quam nesciunt nobis odit modi alias impedit unde temporibus, iure et? Similique, fuga nostrum. Animi voluptates facilis architecto accusamus soluta impedit consectetur dolorum. Fugiat explicabo dolore quaerat itaque iusto ex nobis expedita esse harum commodi? Voluptatem doloremque ut eum cum eaque, iure rerum fugit.',
        price: 711,
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
