const { db, Sequelize } = require('../config/db');

const Item = db.define('items', {
  name: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER,
  },
  categoryID: {
    type: Sequelize.INTEGER,
  },
  rarityID: {
    type: Sequelize.INTEGER,
  },
});

// Item.sync({ force: true });

module.exports = Item;
