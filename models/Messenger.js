var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Messenger Model
 * ==========
 */

var Messenger = new keystone.List('Messenger', {
  defaultSort: '-createdAt'
});

Messenger.add({
  messengerId: { type: String, required: true, initial: true },
  firstName: { type: String },
  lastName: { type: String },
  gender: { type: String },
  profileUrl: { type: String },
  createdAt: { type: Types.Datetime, default: Date.now, noedit: true },
});

Messenger.schema.pre('save', next => {
  console.log('this', this);

  keystone.list('Messenger').model.find({
    messengerId: this.messengerId
  }).exec(function (err, r) {
    if (err) { return next(new Error(err)); }

    console.log('r', r);

    if (r.length) {
      // Update info for current user
      const data = JSON.parse(JSON.stringify(this));
      console.log('data', data);
      keystone.list('Messenger').model
        .findOneAndUpdate({ messengerId: data.messengerId }, data, r => {});
    } else {
      return next(); // without any errors
    }
  });
});

Messenger.defaultColumns = 'messengerId, firstName, lastName, gender, createdAt';
Messenger.register();
