var keystone = require('keystone');
var Types = keystone.Field.Types;

var GroupMember = new keystone.List('GroupMember', {
  defaultSort: '-createdAt'
});

GroupMember.add({
  user: {
    type: Types.Relationship,
    ref: 'User',
    initial: true,
    required: true,
  },
  group: {
    type: Types.Relationship,
    ref: 'Group',
    initial: true,
    required: true,
  },
  role: {
    type: Types.Text,
    initial: true,
    required: true,
    default: 'member',
  },
  createdAt: {
    type: Types.Datetime,
    default: Date.now,
    noedit: true,
  },
});

GroupMember.defaultColumns = 'group, user, role, createdAt|15%';
GroupMember.register();
