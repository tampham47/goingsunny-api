/**
 *
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Session Model
 * ==========
 */

var Session = new keystone.List('Session');

Session.add({
	_user: { type: Types.Relationship, ref: 'User', index: true },
	roomName: { type: Types.Text, initial: true },
	isConfirmed: { type: Boolean, default: false },
	createdAt: { type: Types.Datetime, default: Date.now, noedit: true },
});

Session.schema.pre('save', function(next) {
	next();
});


/**
 * Relationships
 */

Session.defaultColumns = '_user, roomName, isConfirmed, createdAt';
Session.register();
