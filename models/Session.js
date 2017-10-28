/**
 *
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Session Model
 * ==========
 */

var Session = new keystone.List('Session', {
  defaultSort: '-createdAt'
});

Session.add({
  _user: { type: Types.Relationship, ref: 'User', initial: true },
  _messenger: { type: Types.Text, initial: true },

  sessionName: { type: Types.Text, initial: true },
  roomName: { type: Types.Text, default: '', initial: true },
  createdAt: { type: Types.Datetime, default: Date.now, noedit: true },
});

Session.schema.pre('save', function(next) {
  if (!this._user && !this._messenger) {
    return next(new Error('User is required.'));
  }

  if (!this.isNew) {
    return next(); // allow the old one free to update
  }

  // only check for the new one
  keystone.list('Session').model.find({
    _user: this._user,
    _messenger: this._messenger,
    sessionName: this.sessionName,
    roomName: '',
  }).exec(function(err, r) {
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

Session.defaultColumns = '_user, _messenger, roomName, sessionName, createdAt';
Session.register();
