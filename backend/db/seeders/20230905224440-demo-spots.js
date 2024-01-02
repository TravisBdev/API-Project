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
        name: 'Clarvy Grove',
        description: "Nestled within the whispering embrace of an enchanted forest, Clarvy Grove is a fairytale come to life. A charming mushroom cottage, with its warm, glowing windows and thatched roof of amber and russet, offers a cozy retreat from the mystical fog that blankets the woods. A quaint wooden bridge arches towards this magical abode, inviting travelers to a world where the air is perfumed with the scent of damp earth and the promise of wonder. It's a place where time slows, and the heart speaks the language of nature's silent songs.",
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
        description: "Berlington Stowe is a spellbinding grove where twilight and enchantment intertwine. Glowing mushrooms nestle amidst the loamy earth, while iridescent butterflies dance in the air, their wings echoing the hues of the night. This magical copse, illuminated by the soft shimmer of bioluminescence, offers a dreamscape for wanderers and dreamers alike. As dusk falls and stars sprinkle the heavens, the whispering woods of Berlington Stowe come alive with the gentle hum of nature's mystique, inviting all to partake in its serene and otherworldly beauty.",
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
        description: "Perched atop the verdant crests of Capvering East, a regal castle reigns over the rolling emerald hills. Its spires reach towards the sky, a testament to the grandeur of bygone eras. The fortress, ensconced in the bosom of the ancient woods, offers breathtaking panoramas that stretch to the horizon, where earth and heaven blend. It is a bastion of history and heritage, a place where one can wander through the echoes of time and indulge in the splendor of nature's unspoiled canvas, a jewel set in the crown of the land's majestic beauty.",
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
        description: "In the tranquil heart of Tharfield Lowes, thatched-roof cottages dot the landscape, their rustic charm mirrored in the still waters of a lily-dappled pond. Here, willows weep softly, their tendrils caressing the surface, while the gentle hum of nature fills the air. This idyllic hamlet offers a serene escape, a return to simplicity where the days move languidly, and the nights are graced by the soft serenade of the evening breeze. Tharfield Lowes is a picturesque retreat where one can soak in the pastoral elegance and unwind in the lap of nature's timeless grace.",
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
        description: "As dusk falls over Clapton Appley, a haunting manor emerges from the mist, its silhouette etched against the dimming sky. The manor's windows flicker with the warm glow of unseen fires, casting a welcoming yet eerie light across the barren landscape. Twisted trees stand as silent witnesses to the centuries that have passed, their branches clawing at the fleeting light. This solemn estate, shrouded in mystery and draped in the veil of twilight, beckons the curious with its blend of grandeur and gothic allure, promising tales of antiquity and the allure of the arcane.",
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
        description: "Cainhorn Keep stands amidst a tempestuous sky, its spires defiant against the crackle of lightning. This fortress, reflected in the glassy stillness of the moat, whispers stories of valor and ancient strife. Each turret and tower, veined with the patina of age, is a chapter in a saga penned by time itself. The keep, a bastion of strength now enshrouded in the shroud of mystery, invites those with a heart for the dramatic and a yearning for history's embrace. It is a place where the past's echo is as palpable as the storm's fury, a monument to the resilience of splendor amidst the shadows.",
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
        name: 'Svalmec',
        description: "Svalmec, a solitary haven nestled in the serene embrace of a snow-clad forest, glows softly against the twilight of a winter's night. The alpine lodge, with its golden windows piercing the blue dusk, offers a beacon of warmth in the vast silence of the frosted wilderness. Surrounded by sentinel pines robed in white, Svalmec is a retreat for those seeking solace in the hush of the snowfall, where the crisp air is a breath of purity and the blanket of snow shimmers like a sea of diamonds under the moon's gentle watch.",
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
        description: "Tarnton Wray reveals itself as a breathtaking spectacle, where the raw majesty of nature's architecture carves out a sanctuary of awe. Towering cliffs frame the crystalline lake, creating an amphitheater of stone and water that echoes with the whispers of the ancients. The sun, breaking through the embrace of the earth, bathes the valley in a radiant light, illuminating a land that time seems to have forgotten. Here, wildlife roams with quiet dignity, and the landscape itself tells a story of creation's grandeur, a place where the pulse of the earth can be felt with every sense.",
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
        name: 'Callipsy',
        description: "Within the warm wooden embrace of Callipsy, comfort and rustic elegance meld seamlessly. This log cabin sanctuary, with its richly patinaed logs and inviting hearth, is a haven where stories and laughter fill the air. Vintage textiles and carefully curated art speak of a love for the land and its heritage. Gazing out from the generous windows, one is treated to a tableau of rugged beauty, where the wilderness whispers tales of the eternal dance between earth and sky. Callipsy offers not just shelter, but a home where every creak of timber and crackle of the fire enriches the soul.",
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
