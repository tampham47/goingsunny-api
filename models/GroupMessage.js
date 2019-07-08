var keystone = require('keystone');
var Types = keystone.Field.Types;

var GroupMessage = new keystone.List('GroupMessage', {
  defaultSort: '-createdAt'
});

GroupMessage.add({
  user: {
    type: Types.Relationship,
    ref: 'User',
    initial: true,
    index: true,
    required: true,
  },
  group: {
    type: Types.Relationship,
    ref: 'Group',
    initial: true,
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

GroupMessage.defaultColumns = 'group, user, createdAt|15%';
GroupMessage.register();
