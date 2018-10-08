var keystone = require('keystone');
var Types = keystone.Field.Types;

var KEssay = new keystone.List('KEssay', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  defaultSort: '-createdAt'
});

KEssay.add({
  unit: {
    type: Types.Relationship,
    ref: 'KUnit',
  },
  unitName: {
    type: String,
    required: true,
    initial: '-',
  },
  title: {
    type: String,
    required: true,
  },
  state: {
    type: Types.Select,
    options: 'draft, published, archived',
    default: 'draft',
  },
  publishedDate: {
    type: Types.Date,
    dependsOn: { state: 'published' },
  },
  content: {
    type: Types.Html,
    wysiwyg: true,
    height: 400,
  },
  author: {
    type: Types.Relationship,
    ref: 'User',
  },
  createdAt: {
    type: Types.Datetime,
    default: Date.now,
    noedit: true,
  },
});

KEssay.defaultColumns = 'title, state|20%, author|20%, createdAt|20%';
KEssay.register();
