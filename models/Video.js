var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Video Model
 * ==========
 */

var Video = new keystone.List('Video', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  defaultSort: '-createdAt'
});

Video.add({
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
  link: { type: Types.Url },
  embededLink: { type: Types.Url },
  cover: { type: Types.CloudinaryImage },
  desc: { type: Types.Html, wysiwyg: true, height: 150 },
  createdAt: {
    type: Types.Datetime,
    default: Date.now,
    noedit: true,
  },
});

Video.schema.virtual('content.full').get(function() {
  return this.content.extended || this.content.brief;
});

Video.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Video.register();
