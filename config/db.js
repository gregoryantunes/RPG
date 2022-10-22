const Sequelize = require('sequelize');
// Database Config
const db = new Sequelize('postgres://archivist:n28815fm5@127.0.0.1:5432/pumatstore');

// Validation
db.authenticate().then(() => {
  console.log('Connected');
}).catch((err) => {
  console.log(`Could not connect, error: ${err.message}`);
});

module.exports = {
  Sequelize,
  db,
};
