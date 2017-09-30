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
  _user: { type: Types.Relationship, ref: 'User', index: true, initial: true },
  sessionName: { type: Types.Text, initial: true },
  roomName: { type: Types.Text, default: '' },
  isConfirmed: { type: Boolean, default: false },
  createdAt: { type: Types.Datetime, default: Date.now, noedit: true },
});

Session.schema.pre('save', function(next) {
  if (!this._user) {
    return next(new Error('User is required.'));
  }
  keystone.list('Session').model.find({
    _user: this._user,
    sessionName: this.sessionName,
    roomName: '',
  }).exec(function(err, r) {
    console.log('data', this);
    console.log('data', r);
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

Session.defaultColumns = '_user, roomName, sessionName, isConfirmed, createdAt';
Session.register();
