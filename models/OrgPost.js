var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * OrgPost Model
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

var OrgPost = new keystone.List('OrgPost', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  defaultSort: '-createdAt'
});

OrgPost.add({
  title: { type: String, required: true },
  state: {
    type: Types.Select,
    options: 'draft, published, archived',
    default: 'draft',
    index: true,
  },
  publishedAt: {
    type: Types.Datetime,
    index: true,
    dependsOn: {
      state: 'published',
    },
  },
  author: { type: Types.Relationship, ref: 'User', index: true },
  image: { type: Types.File, storage: myStorage },
  banner: { type: Types.Url },
  brief: { type: Types.Html, wysiwyg: true, height: 150 },
  content: { type: Types.Html, wysiwyg: true, height: 400, require: true },
  tags: { type: Types.TextArray }, // `tutor,admin`
  numberOfReaction: {
    type: Number,
    default: 0,
  },
  numberOfComment: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Types.Datetime,
    default: Date.now,
    noedit: true,
  },
});

OrgPost.schema.pre('save', function(next) {
  this.publishedAt = Date.now();
  return next();
});

OrgPost.defaultColumns = 'title, state|20%, author|20%, createdAt|20%';
OrgPost.register();
