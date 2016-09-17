/**
 * 
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Lesson Model
 * ==========
 */

var Lesson = new keystone.List('Lesson');

Lesson.add({
	_user: { type: Types.Relationship, ref: 'User', index: true },
	_channel: { type: Types.Relationship, ref: 'Channel', index: true },
	name: { type: Types.Text, required: true, index: true, initial: true },
	state: { type: Types.Select, options: 'public, draft', default: 'draft', index: true },
	content: { type: Types.Html, wysiwyg: true, height: 400 },
	availableDate: { type: Types.Date, format: 'YYYY-MM-DD'},
	availableDateStr: { type: String },
	createdAt: { type: Types.Datetime, default: Date.now, noedit: true }
});

Lesson.schema.pre('save', function(next) {
	this.availableDateStr = this._.availableDate.format('YYYYMMDD');
	next();
});


/**
 * Relationships
 */


/**
 * Registration
 */

Lesson.defaultColumns = 'name, url, _user, _channel, createdAt';
Lesson.register();
