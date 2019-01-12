var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Event Model
 * ==========
 */

var myStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    // required; path where the files should be stored
    path: keystone.expandPath('./public/uploads'),
    // path where files will be served
    publicPath: '/public/uploads',
  }
});

var Event = new keystone.List('Event', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  defaultSort: '-createdAt'
});

Event.add({
  title: { type: String, required: true },
  state: {
    type: Types.Select,
    options: 'draft, published, archived',
    default: 'draft',
    index: true,
  },
  author: {
    type: Types.Relationship,
    ref: 'User',
    index: true,
  },
  date: { type: Types.Datetime },
  dateStr: { type: String },
  place: { type: String },
  link: { type: String },
  image: { type: Types.File, storage: myStorage },
  desc: { type: Types.Html, wysiwyg: true, height: 300 },
  createdAt: {
    type: Types.Datetime,
    default: Date.now,
    noedit: true,
  },
});

Event.schema.virtual('content.full').get(function() {
  return this.content.extended || this.content.brief;
});

Event.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Event.register();
