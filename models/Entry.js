var moment = require('moment-timezone');
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
  email: { type: Types.Email },
  phone: { type: String },
  author: {
    type: Types.Relationship,
    ref: 'User',
    index: true,
  },
  state: {
    type: Types.Select,
    options: 'draft, published',
    default: 'draft',
    index: true,
  },
  topic: {
    type: Types.Relationship,
    ref: 'Topic',
    index: true,
  },
  content: { type: Types.Textarea, height: 400 },
  dateStr: { type: String, noedit: true },
  createdAt: { type: Types.Datetime, default: Date.now, noedit: true },
});

Entry.schema.pre('save', function(next) {
  this.dateStr = moment().tz('Asia/Ho_Chi_Minh').format('YYYYMMDD');
  // auto turn status to published when the word count is large than 120
  if (this.content.split(' ').length > 120) {
    this.state = 'published';
  }
  next();
});

Entry.defaultColumns = 'author|15%, topic|30%, state|15% createdAt|20%';
Entry.register();
