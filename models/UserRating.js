var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * UserRating Model
 * ==========
 */

var UserRating = new keystone.List('UserRating', {
  defaultSort: '-createdAt'
});

UserRating.add({
  user: { // the people who receive the feedback
    type: Types.Relationship,
    ref: 'User',
    initial: true,
    index: true,
    required: true,
  },
  creator: { // who create this feedback
    type: Types.Relationship,
    ref: 'User',
    initial: true,
    index: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
    initial: true,
  },
  content: {
    type: Types.Html,
    wysiwyg: true,
    height: 150,
  },
  star: {
    type: Number,
    required: true,
    initial: true,
  },
  createdAt: {
    type: Types.Datetime,
    default: Date.now,
    noedit: true,
  },
});

UserRating.defaultColumns = 'user, creator, star, createdAt|20%';
UserRating.register();
