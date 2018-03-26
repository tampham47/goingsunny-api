var keystone = require('keystone');

/**
 * BlogCategory Model
 * ==================
 */

var BlogCategory = new keystone.List('BlogCategory', {
  autokey: { from: 'name', path: 'key', unique: true }
});

BlogCategory.add({
  name: { type: String, required: true }
});

// BlogCategory.relationship({ ref: 'Blog', path: 'categories' });
BlogCategory.register();
