const Rarity = require('../models/Rarity');

// Controllers for Rarities
// List
exports.rarityList = (req, res) => {
  Rarity.findAll({ order: [['name', 'ASC']] }).then((rarities) => {
    res.render('rarity', { rarities });
  }).catch((err) => {
    res.send(`Something went wrong: ${err.message}`);
  });
};

// Register
exports.rarityCreateGet = (req, res) => {
  res.render('add_rarity');
};
exports.rarityCreatePost = (req, res) => {
  const { name } = req.body;
  const errors = [];

  if (name.startsWith(' ') || name.endsWith(' ')) errors.push({ warning: 'Rarity cannot start/end with space' });
  if (name.length < 3) errors.push({ warning: 'Rarity must have more then 3 letters' });
  if (errors.length === 0) {
    Rarity.create({ name }).then(() => {
      req.flash('success_msg', 'Rarity created successfully');
      res.redirect('/admin/rarity');
    }).catch((err) => {
      req.flash('error_msg', `Something went wrong: ${err.message}`);
    });
  } else {
    res.render('add_rarity', { name, errors });
  }
};

// Delete
exports.rarityDelete = (req, res) => {
  const { checkboxdelete } = req.body;

  if (!checkboxdelete) {
    req.flash('error_msg', 'You must select a rarity in order to delete it');
    res.redirect('/admin/rarity');
  }
  Rarity.destroy({ where: { id: checkboxdelete } }).then(() => {
    req.flash('success_msg', 'Rarity deleted successfully');
    res.redirect('/admin/rarity');
  }).catch((err) => {
    req.flash('error_msg', `An unexpected error occurred, error: ${err.message}`);
  });
};

// Edit
exports.rarityUpdateGet = (req, res) => {
  Rarity.findOne({ where: { id: req.params.id } }).then((rarity) => {
    res.render('edit_rarity', { rarity });
  }).catch((err) => {
    res.send(`Error: ${err.message}`);
  });
};

exports.rarityUpdatePost = (req, res) => {
  const { id, name } = req.body;

  Rarity.findOne({ where: { id } }).then((rarity) => {
    if (name.length < 3) {
      req.flash('error_msg', 'Rarity must have more then 3 letters');
      res.redirect(`/admin/rarity/edit/${id}`);
    } else if (name.startsWith(' ') || name.endsWith(' ')) {
      req.flash('error_msg', 'Name cannot start/end with space');
      res.redirect(`/admin/rarity/edit/${id}`);
    } else {
      const newRarity = rarity;

      newRarity.id = id;
      newRarity.name = name;

      newRarity.save().then(() => {
        req.flash('success_msg', 'Rarity edited successfully!');
        res.redirect('/admin/rarity');
      }).catch((err) => {
        req.flash('error_msg', `Something went wrong! Error: ${err.message}`);
      });
    }
  }).catch((err) => {
    req.flash('error_msg', `Something went wrong! Error: ${err.message}`);
  });
};
