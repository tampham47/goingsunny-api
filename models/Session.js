/**
 *
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Session Model
 * ==========
 */

var Session = new keystone.List('Session', {
	defaultSort: '-createdAt'
});

Session.add({
	_user: { type: Types.Relationship, ref: 'User', index: true },
	roomName: { type: Types.Text, initial: true },
	sessionName: { type: Types.Text, initial: true },
	isConfirmed: { type: Boolean, default: false },
	createdAt: { type: Types.Datetime, default: Date.now, noedit: true },
});

Session.schema.pre('save', function(next) {
	if (!this._user) {
		return next({message: 'User is required.'});
	}
	next();
});


/**
 * Relationships
 */

Session.defaultColumns = '_user, roomName, sessionName, isConfirmed, createdAt';
Session.register();
