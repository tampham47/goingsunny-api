/**
 * 
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Message Model
 * ==========
 */

var Message = new keystone.List('Message', {
	defaultSort: '-createdAt'
});

Message.add({
	_user: { type: Types.Relationship, ref: 'User', index: true },
	_channel: { type: Types.Relationship, ref: 'Channel', index: true },
	content: { type: Types.Textarea, initial: true, required: true },
	channelUrl: { type: String },
	type: { type: String },
	createdAt: { type: Types.Datetime, default: Date.now, noedit: true }
});

//Add
Message.schema.add({ 
	authUser: keystone.mongoose.Schema.Types.Mixed,
});


Message.defaultColumns = 'channelUrl, _user, content, createdAt';
Message.register();
