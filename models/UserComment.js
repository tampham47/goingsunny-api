var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * UserComment Model
 * ==========
 */

var UserComment = new keystone.List('UserComment', {
  defaultSort: '-createdAt'
});

UserComment.add({
  user: {
    type: Types.Relationship,
    ref: 'User',
    initial: true,
    index: true,
    required: true,
  },
  target: {
    type: Types.Select,
    options: 'essay, post',
    default: 'essay',
    index: true,
  },
  post: {
    type: Types.Relationship,
    ref: 'OrgPost',
    index: true,
  },
  essay: {
    type: Types.Relationship,
    ref: 'KEssay',
    index: true,
  },
  content: {
    type: Types.Html,
    wysiwyg: true,
    height: 150,
  },
  createdAt: {
    type: Types.Datetime,
    default: Date.now,
    noedit: true,
  },
});

UserComment.defaultColumns = 'user, content, essay|10, post|10, createdAt';
UserComment.register();
