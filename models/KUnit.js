var keystone = require('keystone');
var Types = keystone.Field.Types;

var KUnit = new keystone.List('KUnit', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  defaultSort: '-createdAt'
});

KUnit.add({
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
  state: {
    type: Types.Select,
    options: 'published, draft, archived',
    default: 'published',
  },
  createdAt: {
    type: Types.Datetime,
    default: Date.now,
    noedit: true,
  },
});

KUnit.defaultColumns = 'title, unitName|20%, state|20%, createdAt|20%';
KUnit.register();
