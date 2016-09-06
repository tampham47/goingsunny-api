/**
 * 
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Channel Model
 * ==========
 */

var Channel = new keystone.List('Channel');

Channel.add({
	_user: { type: Types.Relationship, ref: 'User', index: true },
	url: { type: Types.Text, required: true, index: true, initial: true },
	name: { type: Types.Text, required: true, index: true, initial: true },
	state: { type: Types.Select, options: 'public, private', default: 'public', index: true },
	description: { type: Types.Textarea, height: 150 },
	createdAt: { type: Types.Datetime, default: Date.now, noedit: true }
});


/**
 * Relationships
 */


/**
 * Registration
 */

Channel.defaultColumns = 'name, url, _user, createdAt';
Channel.register();
