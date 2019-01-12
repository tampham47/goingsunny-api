/**
 *
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Lesson Model
 * ==========
 */

var Lesson = new keystone.List('Lesson', {
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

Lesson.add({
  _user: { type: Types.Relationship, ref: 'User', index: true },
  state: { type: Types.Select, options: 'published, draft', default: 'draft', index: true },

  metaTitle: { type: Types.Text },
  metaImage: { type: Types.Url },
  metaDescription: { type: Types.Textarea },
  metaAuthor: { type: Types.Text },
  metaType: { type: Types.Text },
  metaUrl: { type: Types.Url },
  metaKeywords: { type: Types.Text },

  name: { type: Types.Text, required: true, index: true, initial: true },
  videoIntro: { type: Types.Textarea },
  youtubeId: { type: Types.Text },
  youtubeEmbedLink: { type: Types.Url },

  imageIntro: { type: Types.Textarea },
  image01: { type: Types.File, storage: myStorage },
  image02: { type: Types.File, storage: myStorage },
  image03: { type: Types.File, storage: myStorage },
  image04: { type: Types.File, storage: myStorage },
  image05: { type: Types.File, storage: myStorage },

  content: { type: Types.Html, wysiwyg: true, height: 400 },
  vocabulary: { type: Types.Html, wysiwyg: true, height: 300 },

  availableDate: { type: Types.Date, format: 'YYYY-MM-DD' },
  availableDateStr: { type: String },
  createdAt: { type: Types.Datetime, default: Date.now, noedit: true }
});

Lesson.schema.pre('save', function(next) {
  this.availableDateStr = this._.availableDate.format('YYYYMMDD');
  next();
});


Lesson.defaultColumns = 'name, state|15%, availableDateStr|15%, _user|15%, createdAt|20%';
Lesson.register();
