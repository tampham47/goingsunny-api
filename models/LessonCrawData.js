/**
 *
 */

var keystone = require('keystone');
var Lesson = keystone.mongoose.model('Lesson');
var Types = keystone.Field.Types;

/**
 * LessonCrawData Model
 * ==========
 */

var LessonCrawData = new keystone.List('LessonCrawData', {
  defaultSort: 'availableDateStr'
});

var myStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: keystone.expandPath('./public/uploads'), // required; path where the files should be stored
    publicPath: '/public/uploads', // path where files will be served
  }
});

LessonCrawData.add({
  _user: { type: Types.Relationship, ref: 'User', index: true },
  source: { type: Types.Url },
  state: { type: Types.Select, options: 'published, draft', default: 'draft', index: true },

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

  availableDate: { type: Types.Date, format: 'YYYY-MM-DD'},
  availableDateStr: { type: String },
  createdAt: { type: Types.Datetime, default: Date.now, noedit: true, format: 'YYYY-MM-DD' }
});


LessonCrawData.schema.add({ mixedData: keystone.mongoose.Schema.Types.Mixed });

LessonCrawData.schema.pre('save', function(next) {
  this.availableDateStr = this._.availableDate.format('YYYYMMDD');

  if (this.state === 'published') {
    var lesson = new Lesson({
      _user: this._user,
      state: this.state,
      name: this.name,
      videoIntro: this.videoIntro,
      youtubeId: this.youtubeId,
      youtubeEmbedLink: this.youtubeEmbedLink,
      imageIntro: this.imageIntro,
      image01: this.image01,
      image02: this.image02,
      image03: this.image03,
      image04: this.image04,
      image05: this.image05,
      content: this.content,
      vocabulary: this.vocabulary,
      availableDate: this.availableDate,
      availableDateStr: this.availableDateStr
    });

    lesson.save(function(err, data) {
      console.log('Lesson new err', err);
    });
  }

  next();
});


LessonCrawData.defaultColumns = 'name, state|15%, availableDateStr|15%, _user|15%, createdAt|20%';
LessonCrawData.register();
