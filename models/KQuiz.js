var keystone = require('keystone');
var Types = keystone.Field.Types;

var KQuiz = new keystone.List('KQuiz', {
  defaultSort: '-createdAt'
});

KQuiz.add({
  author: {
    type: Types.Relationship,
    ref: 'User',
    require: true,
    unitial: true,
  },
  unit: {
    type: Types.Relationship,
    ref: 'KUnit',
    initial: true,
  },
  vocab: {
    type: Types.Relationship,
    ref: 'KVocab',
    require: true,
    initial: true,
  },
  // optimize querying
  unitName: {
    type: String,
    required: true,
    initial: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Types.Datetime,
    default: Date.now,
    noedit: true,
  },
});

KQuiz.defaultColumns = 'word, type|10%, pronounce|20%, status|20%, createdAt|20%';
KQuiz.register();
