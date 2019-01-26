var keystone = require('keystone');
var Types = keystone.Field.Types;

var KEssay = new keystone.List('KEssay', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true, fixed: true },
  defaultSort: '-createdAt'
});

KEssay.add({
  unit: {
    type: Types.Relationship,
    ref: 'KUnit',
    initial: true,
  },
  unitName: {
    type: String,
    required: true,
    initial: true,
  },
  title: {
    type: String,
    required: true,
    initial: true,
  },
  content: {
    type: Types.Html,
    wysiwyg: true,
    height: 400,
  },
  isEnglish: {
    type: Boolean,
    default: false,
  },
  actualList: {
    type: String,
  },
  goalList: {
    type: String,
  },
  percentOfGoal: {
    type: Number,
    default: 0,
  },
  state: {
    type: Types.Select,
    options: 'draft, published, archived',
    default: 'draft',
  },
  publishedDate: {
    type: Types.Datetime,
    dependsOn: { state: 'published' },
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
