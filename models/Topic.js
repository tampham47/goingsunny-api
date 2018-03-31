/**
 *
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Topic Model
 * ==========
 */

var Topic = new keystone.List('Topic', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  defaultSort: 'availableDateStr'
});

var myStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    // required; path where the files should be stored
    path: keystone.expandPath('./public/uploads'),
    // path where files will be served
    publicPath: '/public/uploads',
  }
});

Topic.add({
  title: { type: Types.Text, required: true, index: true, initial: true },
  topic: { type: Types.Textarea, height: 200 },
  availableDate: { type: Types.Date, format: 'YYYY-MM-DD' },
  author: { type: Types.Relationship, ref: 'User', index: true },
  state: { type: Types.Select, options: 'published, draft', default: 'draft', index: true },
  cover: { type: Types.File, storage: myStorage },
  example: { type: Types.Textarea, height: 400 },

  youtubeId: { type: Types.Text },
  youtubeEmbedLink: { type: Types.Url },
  videoIntro: { type: Types.Textarea },

  metaTitle: { type: Types.Text },
  metaImage: { type: Types.Url },
  metaDescription: { type: Types.Textarea },
  metaAuthor: { type: Types.Text },
  metaType: { type: Types.Text },
  metaUrl: { type: Types.Url },
  metaKeywords: { type: Types.Text },

  availableDateStr: { type: String, noedit: true },
  createdAt: { type: Types.Datetime, default: Date.now, noedit: true }
});

Topic.schema.pre('save', function(next) {
  this.availableDateStr = this._.availableDate.format('YYYYMMDD');
  next();
});


Topic.defaultColumns = 'title, state|15%, availableDateStr|15%, author|15%, createdAt|20%';
Topic.register();
