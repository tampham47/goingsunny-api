var keystone = require('keystone');
var Types = keystone.Field.Types;

var Group = new keystone.List('Group', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true, fixed: true },
  defaultSort: '-createdAt'
});

Group.add({
  name: {
    type: Types.Text,
    initial: true,
    required: true,
  },
  banner: { type: Types.Url, default: '---' },
  state: {
    type: Types.Select,
    options: 'draft, published, archived',
    default: 'draft',
    index: true,
  },
  brief: { type: Types.Html, wysiwyg: true, height: 150 },
  content: { type: Types.Html, wysiwyg: true, height: 400, require: true },
  limit: { type: Number, default: 6 },
  isPublic: { type: Boolean, default: false },
  price: {
    value: { type: Number, default: 0 },
    currency: { type: String, default: 'VND' },
  },
  tags: { type: Types.TextArray }, //[`speaking`]
  start: { type: Types.Date },
  end: { type: Types.Date },
  admin: {
    type: Types.Relationship,
    ref: 'User',
    initial: true,
    required: true,
  },
  org: {
    type: Types.Relationship,
    ref: 'Org',
    initial: true,
    required: true,
  },
  createdAt: {
    type: Types.Datetime,
    default: Date.now,
    noedit: true,
  },
});

Group.defaultColumns = 'name, limit, isPublic, admin|20%, state, createdAt|15%';
Group.register();
