/**
 *
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PinedPost Model
 * ==========
 */

var PinedPost = new keystone.List('PinedPost', {
  defaultSort: '-createdAt'
});

var myStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    // required; path where the files should be stored
    path: keystone.expandPath('./public/uploads'),
    // path where files will be served
    publicPath: '/public/uploads',
  }
});

PinedPost.add({
  title: { type: Types.Text, required: true, initial: true },
  url: { type: Types.Url, required: true, initial: true },
  type: {
    type: Types.Select,
    options: 'link, pdf, youtube, note',
    default: 'link',
    initial: true,
  },
  state: {
    type: Types.Select,
    options: 'public, archive',
    default: 'public'
  },
  description: { type: Types.Textarea, height: 150 },
  cover: { type: Types.File, storage: myStorage },
  createdAt: { type: Types.Datetime, default: Date.now, noedit: true }
});

PinedPost.defaultColumns = 'title|30%, url|20%, type|10%, state|10%, createdAt';
PinedPost.register();
