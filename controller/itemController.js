const Item = require('../models/Item');

// Controllers for Items
// List

exports.itemList = (req, res) => {
  Item.findAll({ order: [['name', 'ASC']] }).then((items) => {
    res.render('item', { items });
  }).catch((err) => {
    res.send(`Something went wrong: ${err.message}`);
  });
};

// Register
exports.itemCreateGet = (req, res) => {
  res.render('add_item');
};
exports.itemCreatePost = (req, res) => {
  const { name, description } = req.body;
  const errors = [];

  if (name.startsWith(' ') || name.endsWith(' ') || description.startsWith(' ') || description.endsWith(' ')) errors.push({ warning: 'Item cannot start/end with space' });
  if (name.length < 3 || description.length < 3) errors.push({ warning: 'Item name/description must have more then 3 letters' });
  if (errors.length === 0) {
    Item.create({ name, description }).then(() => {
      req.flash('success_msg', 'Item created successfully');
      res.redirect('/admin/item');
    }).catch((err) => {
      req.flash('error_msg', `Something went wrong: ${err.message}`);
    });
  } else {
    res.render('add_item', { name, description, errors });
  }
};

// Delete
exports.itemDelete = (req, res) => {
  const { checkboxdelete } = req.body;

  if (!checkboxdelete) {
    req.flash('error_msg', 'You must select a item in order to delete it');
    res.redirect('/admin/item');
  }
  Item.destroy({ where: { id: checkboxdelete } }).then(() => {
    req.flash('success_msg', 'Item deleted successfully');
    res.redirect('/admin/item');
  }).catch((err) => {
    req.flash('error_msg', `An unexpected error occurred, error: ${err.message}`);
  });
};
