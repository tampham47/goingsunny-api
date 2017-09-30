/**
 *
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Notification Model
 * ==========
 */

var Notification = new keystone.List('Notification', {
  defaultSort: '-createdAt'
});

Notification.add({
  name: { type: Types.Text, required: true, index: true, initial: true },
  state: { type: Types.Select, options: 'public, draft', default: 'draft', index: true },
  content: { type: Types.Textarea, height: 150 },
  availableFrom: { type: Types.Date, default: Date.now },
  availableTo: { type: Types.Date },
  createdAt: { type: Types.Datetime, default: Date.now, noedit: true }
});


/**
 * Relationships
 */


/**
 * Registration
 */

Notification.defaultColumns = 'name, state, content, availableFrom, availableTo';
Notification.register();
