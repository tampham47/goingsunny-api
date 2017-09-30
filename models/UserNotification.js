var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * UserNotification Model
 * ==========
 */

var UserNotification = new keystone.List('UserNotification', {
  nocreate: true,
  noedit: true,
  defaultSort: '-createdAt'
});

UserNotification.add({
  _user: { type: Types.Relationship, ref: 'User', initial: true, index: true, required: true },
  _notification: { type: Types.Relationship, ref: 'Notification', initial: true, index: true, required: true },
  createdAt: { type: Types.Datetime, default: Date.now, noedit: true },
});


/**
 * Relationships
 */


/**
 * Registration
 */

UserNotification.defaultColumns = '_user, _notification createdAt';
UserNotification.register();
