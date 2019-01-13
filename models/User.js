var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */

var User = new keystone.List('User', {
  defaultSort: '-lastAccessedAt'
});

User.add({
  name: { type: Types.Name, required: true, index: true },
  displayName: { type: String },
  email: { type: Types.Email, initial: true, required: true, index: true },
  password: { type: Types.Password, initial: true, required: true, default: 'nopass', access: 'protected' },
  username: { type: String },
  phoneNumber: { type: String },

  provider: { type: String, noedit: true },
  providerId: { type: String, noedit: true },
  profileUrl: { type: String, noedit: true },
  accessToken: { type: String, noedit: true, access: 'protected' },
  refreshToken: { type: String, noedit: true, access: 'protected' },
  avatar: { type: String, noedit: true },

  lastAccessedAt: { type: Types.Datetime, noedit: true },
  createdAt: { type: Types.Datetime, default: Date.now, noedit: true },

  /* Additional Information */
  avatarFileUpload: { type: Types.CloudinaryImage, initial: true },
  gender: { type: String, initial: true },
  birthDay: { type: Types.Date, initial: true },
  bio: { type: Types.Textarea, initial: true }
}, 'Permissions', {
  isAdmin: { type: Boolean, label: 'Can access Keystone', index: true, access: 'protected' }
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
  return this.isAdmin;
});

User.schema.pre('save', function(next) {
  next();
});

User.defaultColumns = 'name, email|20%, lastAccessedAt|20%';
User.register();
