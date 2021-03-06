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
  is100English: {
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
  numberOfReaction: {
    type: Number,
    default: 0,
  },
  numberOfComment: {
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

KEssay.schema.pre('save', function(next) {
  this.publishedDate = Date.now();
  return next();
});

KEssay.defaultColumns = 'title, state|15%, numberOfReaction, numberOfComment, author|15%, createdAt|15%';
KEssay.register();
