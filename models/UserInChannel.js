var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * UserInChannel Model
 * ==========
 */

var UserInChannel = new keystone.List('UserInChannel', {
	nocreate: true,
	noedit: true
});

UserInChannel.add({
	_user: { type: Types.Relationship, ref: 'User', initial: true, index: true, required: true },
	_channel: { type: Types.Relationship, ref: 'Channel', initial: true, index: true, required: true },
	createdAt: { type: Types.Datetime, default: Date.now, noedit: true },
});


/**
 * Relationships
 */


/**
 * Registration
 */

UserInChannel.defaultColumns = '_user, _channel createdAt';
UserInChannel.register();
