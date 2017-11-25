var keystone = require('keystone');
var Types = keystone.Field.Types;

var myStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: keystone.expandPath('./public/uploads'), // required; path where the files should be stored
    publicPath: '/public/uploads', // path where files will be served
  }
});

/**
 * Oxford Model
 * ==========
 */
var Oxford = new keystone.List('Oxford', {});

Oxford.add({
  word: { type: String, required: true, initial: true, default: '' },
  state: {
    type: Types.Select,
    options: 'draft, published', default: 'published'
  },
  image: { type: Types.File, storage: myStorage },
  example: { type: Types.Html, wysiwyg: true, height: 400 },
  createdAt: { type: Types.Datetime, default: Date.now, noedit: true },
});

Oxford.defaultColumns = 'word, category, state|20%, createdAt|20%';
Oxford.register();
