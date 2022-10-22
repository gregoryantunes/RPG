const Category = require('../models/Category');

// Controllers for Categories
// List
exports.categoryList = (req, res) => {
  Category.findAll({ order: [['name', 'ASC']] }).then((categories) => {
    res.render('category', { categories });
  }).catch((err) => {
    res.send(`Something went wrong: ${err.message}`);
  });
};

// Register
exports.categoryCreateGet = (req, res) => {
  res.render('add_category');
};
exports.categoryCreatePost = (req, res) => {
  const { name, description } = req.body;
  const errors = [];

  if (name.startsWith(' ') || name.endsWith(' ') || description.startsWith(' ') || description.endsWith(' ')) errors.push({ warning: 'Category cannot start/end with space' });
  if (name.length < 3 || description.length < 3) errors.push({ warning: 'Category name/description must have more then 3 letters' });
  if (errors.length === 0) {
    Category.create({ name, description }).then(() => {
      req.flash('success_msg', 'Category created successfully');
      res.redirect('/admin/category');
    }).catch((err) => {
      req.flash('error_msg', `Something went wrong: ${err.message}`);
    });
  } else {
    res.render('add_category', { name, description, errors });
  }
};

// Delete
exports.categoryDelete = (req, res) => {
  const { checkboxdelete } = req.body;

  if (!checkboxdelete) {
    req.flash('error_msg', 'You must select a category in order to delete it');
    res.redirect('/admin/category');
  }
  Category.destroy({ where: { id: checkboxdelete } }).then(() => {
    req.flash('success_msg', 'Category deleted successfully');
    res.redirect('/admin/category');
  }).catch((err) => {
    req.flash('error_msg', `An unexpected error occurred, error: ${err.message}`);
  });
};

// Edit
exports.categoryUpdateGet = (req, res) => {
  Category.findOne({ where: { id: req.params.id } }).then((category) => {
    res.render('edit_category', { category });
  }).catch((err) => {
    res.send(`Error: ${err.message}`);
  });
};

exports.categoryUpdatePost = (req, res) => {
  const { id, name, description } = req.body;

  Category.findOne({ where: { id } }).then((category) => {
    if (name.length < 3 || description.length < 3) {
      req.flash('error_msg', 'Category name/description must have more then 3 letters');
      res.redirect(`/admin/category/edit/${id}`);
    } else if (name.startsWith(' ') || name.endsWith(' ') || description.startsWith(' ') || description.endsWith(' ')) {
      req.flash('error_msg', 'Name cannot start/end with space');
      res.redirect(`/admin/category/edit/${id}`);
    } else {
      const newCategory = category;

      newCategory.id = id;
      newCategory.name = name;
      newCategory.description = description;

      newCategory.save().then(() => {
        req.flash('success_msg', 'Category edited successfully!');
        res.redirect('/admin/category');
      }).catch((err) => {
        req.flash('error_msg', `Something went wrong! Error: ${err.message}`);
      });
    }
  }).catch((err) => {
    req.flash('error_msg', `Something went wrong! Error: ${err.message}`);
  });
};
