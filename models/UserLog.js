var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * UserLog Model
 * ==========
 */

var UserLog = new keystone.List('UserLog', {
  defaultSort: '-createdAt'
});

UserLog.add({
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

UserLog.defaultColumns = 'user, creator, createdAt|20%';
UserLog.register();
