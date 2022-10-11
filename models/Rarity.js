const { db, Sequelize } = require('../config/db');

const Rarity = db.define('item_rarity', {
  name: {
    type: Sequelize.STRING,
  },
});

// Rarity.sync({ force: true });

module.exports = Rarity;
