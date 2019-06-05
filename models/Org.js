var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Org Model
 * ==========
 */

var myStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    // required; path where the files should be stored
    path: keystone.expandPath('./public/uploads'),
    // path where files will be served
    publicPath: '/public/uploads',
  }
});

var Org = new keystone.List('Org', {
  defaultSort: '-createdAt'
});

Org.add({
  name: {
    type: Types.Text,
    initial: true,
    required: true,
  },
  icon: { type: Types.File, storage: myStorage },
  admin: {
    type: Types.Relationship,
    ref: 'User',
    initial: true,
    required: true,
  },
  createdAt: {
    type: Types.Datetime,
    default: Date.now,
    noedit: true,
  },
});

Org.defaultColumns = 'name, admin|30%, createdAt|15%';
Org.register();
