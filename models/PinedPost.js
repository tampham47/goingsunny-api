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

PinedPost.add({
  title: { type: Types.Text, required: true, initial: true },
  url: { type: Types.Url, required: true, initial: true },
  type: { type: Types.Select, options: 'link, pdf, youtube', default: 'link', initial: true },
  state: { type: Types.Select, options: 'public, archive', default: 'public' },
  description: { type: Types.Textarea, height: 150 },
  createdAt: { type: Types.Datetime, default: Date.now, noedit: true }
});

PinedPost.defaultColumns = 'title|30%, url|20%, type|10%, state|10%, createdAt';
PinedPost.register();
