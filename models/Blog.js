var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Blog Model
 * ==========
 */

var Blog = new keystone.List('Blog', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  defaultSort: '-createdAt'
});

Blog.add({
  title: { type: String, required: true },
  state: {
    type: Types.Select,
    options: 'draft, published, archived',
    default: 'draft',
    index: true,
  },
  author: { type: Types.Relationship, ref: 'User', index: true },
  publishedDate: {
    type: Types.Date,
    index: true,
    dependsOn: {
      state: 'published',
    },
  },
  image: { type: Types.CloudinaryImage },
  brief: { type: Types.Html, wysiwyg: true, height: 150 },
  desc: { type: Types.Html, wysiwyg: true, height: 400 },
  categories: {
    type: Types.Relationship,
    ref: 'BlogCategory',
    many: true
  },
  createdAt: {
    type: Types.Datetime,
    default: Date.now,
    noedit: true,
  },
});

Blog.schema.virtual('content.full').get(function() {
  return this.content.extended || this.content.brief;
});

Blog.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Blog.register();
