const { db, Sequelize } = require('../config/db');
const Category = require('./Category');
const Rarity = require('./Rarity');

const Item = db.define('items', {
  name: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER,
  },
});

Category.hasMany(Item);
Item.belongsTo(Category, {
  foreignKey: 'categoryId',
});

Rarity.hasMany(Item);
Item.belongsTo(Rarity, {
  foreignKey: 'rarityId',
});

// Item.sync({ force: true });

module.exports = Item;
