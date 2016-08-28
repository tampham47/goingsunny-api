var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Channel Model
 * ==========
 */

var Channel = new keystone.List('Channel');

Channel.add({
	name: { type: Types.Text, required: true, index: true },
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
