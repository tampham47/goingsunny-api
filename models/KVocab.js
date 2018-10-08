var keystone = require('keystone');
var Types = keystone.Field.Types;

var KVocab = new keystone.List('KVocab', {
  defaultSort: '-createdAt'
});

KVocab.add({
  unit: {
    type: Types.Relationship,
    ref: 'KUnit',
  },
  unitName: {
    type: String,
    required: true,
    initial: '-',
  },
  word: {
    type: String,
    required: true,
    initial: true,
  },
  type: {
    type: Types.Select,
    options: 'verb, noun, adj, adv',
    default: 'verb',
  },
  pronounce: {
    type: String,
  },
  hint: {
    type: String,
  },
  createdAt: {
    type: Types.Datetime,
    default: Date.now,
    noedit: true,
  },
});

KVocab.defaultColumns = 'word, type|10%, pronounce|20%, unit|20%, createdAt|20%';
KVocab.register();
