/**
 * 
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Message Model
 * ==========
 */

var Message = new keystone.List('Message');

Message.add({
	_user: { type: Types.Relationship, ref: 'User', index: true },
	_channel: { type: Types.Relationship, ref: 'Channel', index: true },
	content: { type: Types.Textarea, initial: true, required: true },
	createdAt: { type: Types.Datetime, default: Date.now, noedit: true }
});

//Add
Message.schema.add({ 
	authUser: keystone.mongoose.Schema.Types.Mixed,
	channelUrl: String
});

/**
 * Relationships
 */


/**
 * Registration
 */

Message.defaultColumns = '_channel, _user, content, createdAt';
Message.register();
