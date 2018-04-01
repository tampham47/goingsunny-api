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
  next();
});

Entry.defaultColumns = 'title, topic|20%, author|20%, createdAt|20%';
Entry.register();
