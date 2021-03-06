var keystone = require('keystone');
var Types = keystone.Field.Types;

var KUserQuiz = new keystone.List('KUserQuiz', {
  defaultSort: '-createdAt'
});

KUserQuiz.add({
  author: {
    type: Types.Relationship,
    ref: 'User',
    require: true,
    initial: true,
  },
  unit: {
    type: Types.Relationship,
    ref: 'KUnit',
    initial: true,
  },
  // optimize querying
  unitName: {
    type: String,
    required: true,
    initial: true,
  },
  amountOfCorrectAnswer: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Types.Datetime,
    default: Date.now,
    noedit: true,
  },
});

KUserQuiz.defaultColumns = 'author, unit|15%, amount|15%, createdAt|20%';
KUserQuiz.register();
