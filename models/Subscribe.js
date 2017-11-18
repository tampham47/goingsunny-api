/**
 *
 */

var keystone = require('keystone');
var moment = require('moment');
var Types = keystone.Field.Types;

/**
 * Subscribe Model
 * ==========
 */

var Subscribe = new keystone.List('Subscribe', {
  defaultSort: '-createdAt'
});

Subscribe.add({
  _messenger: { type: Types.Text, initial: true },
  subscribeName: { type: Types.Text, initial: true },
  createdAt: { type: Types.Datetime, default: Date.now, noedit: true },
});

Subscribe.schema.pre('save', function (next) {
  this.subscribeName = moment().format('YYYYMMDD');

  if (!this._messenger) {
    return next(new Error('messengerId is required.'));
  }

  if (!this.isNew) {
    return next(); // allow the old one free to update
  }

  // only check for the new one
  keystone.list('Subscribe').model.find({
    _messenger: this._messenger,
    subscribeName: this.subscribeName,
  }).exec(function (err, r) {
    if (err) {
      return next(new Error(err));
    }

    if (r.length) {
      return next(new Error('Your request was in queue already!'));
    } else {
      return next(); // without any errors
    }
  });
});


/**
 * Relationships
 */

Subscribe.defaultColumns = '_messenger, subscribeName, createdAt';
Subscribe.register();
