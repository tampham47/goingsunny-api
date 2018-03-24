var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Entry Model
 * ==========
 */

var Entry = new keystone.List('Entry', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  defaultSort: '-createdAt'
});

Entry.add({
  title: { type: String, required: true },
  author: {
    type: Types.Relationship,
    ref: 'User',
    index: true,
  },
  topic: {
    type: Types.Relationship,
    ref: 'Topic',
    index: true,
  },
  content: { type: Types.Html, wysiwyg: true, height: 400 },
  createdAt: { type: Types.Datetime, default: Date.now, noedit: true },
});

Entry.schema.virtual('content.full').get(function() {
  return this.content.extended || this.content.brief;
});

Entry.defaultColumns = 'title, topic|20%, author|20%, createdAt|20%';
Entry.register();
