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
	userId: { type: Types.Relationship, ref: 'User', initial: true, index: true, required: true },
	channelId: { type: Types.Relationship, ref: 'Channel', initial: true, index: true, required: true },
	createdAt: { type: Types.Datetime, default: Date.now, noedit: true },
});


/**
 * Relationships
 */


/**
 * Registration
 */

UserInChannel.defaultColumns = 'name createdAt';
UserInChannel.register();
