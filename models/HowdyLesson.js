/**
 *
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * HowdyLesson Model
 * ==========
 */

var HowdyLesson = new keystone.List('HowdyLesson', {
  defaultSort: 'availableDateStr'
});

var myStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: keystone.expandPath('./public/uploads'), // required; path where the files should be stored
    publicPath: '/public/uploads', // path where files will be served
  }
});

var vocabDefined = {
  word: { type: String },
  pron: { type: String },
  example: { type: String },
  audio: { type: Types.File, storage: myStorage },
};

HowdyLesson.add({
  _user: { type: Types.Relationship, ref: 'User', index: true },
  state: {
    type: Types.Select,
    options: 'published, draft',
    default: 'draft',
    index: true,
  },

  name: { type: Types.Text, required: true, initial: true },
  availableDate: { type: Types.Date, format: 'YYYY-MM-DD' },

  youtubeLink: { type: Types.Url },
  videoIntro: { type: Types.Textarea },

  brainstorming: { type: Types.Html, wysiwyg: true, height: 250 },
  content: { type: Types.Html, wysiwyg: true, height: 250 },

  vocab01: vocabDefined,
  vocab02: vocabDefined,
  vocab03: vocabDefined,
  vocab04: vocabDefined,
  vocab05: vocabDefined,
  vocab06: vocabDefined,
  vocab07: vocabDefined,
  vocab08: vocabDefined,
  vocab09: vocabDefined,
  vocab10: vocabDefined,

  availableDateStr: { type: String, noedit: true },
  createdAt: { type: Types.Datetime, default: Date.now, noedit: true },

  // for SEO
  metaTitle: { type: Types.Text },
  metaImage: { type: Types.Url },
  metaDescription: { type: Types.Textarea },
  metaAuthor: { type: Types.Text },
  metaType: { type: Types.Text },
  metaUrl: { type: Types.Url },
  metaKeywords: { type: Types.Text },
});

HowdyLesson.schema.pre('save', function (next) {
  this.availableDateStr = this._.availableDate.format('YYYYMMDD');
  next();
});

HowdyLesson.defaultColumns = 'name, state|15%, availableDateStr|15%, createdAt|20%';
HowdyLesson.register();
