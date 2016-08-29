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
	name: { type: Types.Text, required: true, index: true },
	state: { type: Types.Select, options: 'public, private', default: 'public', index: true },
	brief: { type: Types.Html, wysiwyg: true, height: 150 },
	createdAt: { type: Types.Datetime, default: Date.now, noedit: true }
});


/**
 * Relationships
 */


/**
 * Registration
 */

Channel.defaultColumns = 'name, createdAt';
Channel.register();
