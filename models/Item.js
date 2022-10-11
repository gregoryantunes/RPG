const { db, Sequelize } = require('../config/db');

const Item = db.define('item_catalogs', {
  name: {
    type: Sequelize.STRING,
    required: true,
  },
  price: {
    type: Sequelize.INTEGER,
    required: true,
  },
  category: {
    type: Sequelize.STRING,
    required: true,
  },
});

module.exports = Item;

// Item.sync({ force: true });
