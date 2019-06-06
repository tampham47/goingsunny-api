var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * UserReaction Model
 * ==========
 */

var UserReaction = new keystone.List('UserReaction', {
  defaultSort: '-createdAt'
});

UserReaction.add({
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
  number: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Types.Datetime,
    default: Date.now,
    noedit: true,
  },
});

UserReaction.defaultColumns = 'user, target, post, essay, createdAt';
UserReaction.register();
