var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * OrgMember Model
 * ==========
 */

var OrgMember = new keystone.List('OrgMember', {
  defaultSort: '-createdAt'
});

OrgMember.add({
  org: {
    type: Types.Relationship,
    ref: 'Org',
    initial: true,
    index: true,
    required: true,
  },
  member: {
    type: Types.Relationship,
    ref: 'User',
    initial: true,
    index: true,
    required: true,
  },
  role: {
    type: Types.Text,
    initial: true,
    required: true,
    default: 'editor',
  },
  createdAt: {
    type: Types.Datetime,
    default: Date.now,
    noedit: true,
  },
});

OrgMember.defaultColumns = 'org, member, role, createdAt';
OrgMember.register();
