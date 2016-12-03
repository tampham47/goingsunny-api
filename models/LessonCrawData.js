/**
 *
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * LessonCrawData Model
 * ==========
 */

var LessonCrawData = new keystone.List('LessonCrawData', {
	defaultSort: '-createdAt'
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
	_channel: { type: Types.Relationship, ref: 'Channel', index: true },
	state: { type: Types.Select, options: 'public, draft', default: 'draft', index: true },
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
	availableDate: { type: Types.Date, format: 'YYYY-MM-DD'},
	availableDateStr: { type: String },
	createdAt: { type: Types.Datetime, default: Date.now, noedit: true }
});

LessonCrawData.schema.pre('save', function(next) {
	this.availableDateStr = this._.availableDate.format('YYYYMMDD');
	next();
});


LessonCrawData.defaultColumns = 'name, intro, availableDateStr, _user, createdAt';
LessonCrawData.register();
