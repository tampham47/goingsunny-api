var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */

var User = new keystone.List('User');

User.add({
	name: { type: Types.Name, required: true, index: true },
	displayName: { type: String },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
	username: { type: String },
	provider: { type: String, noedit: true },
	providerId: { type: String, noedit: true },
	profileUrl: { type: String, noedit: true },
	avatar: { type: String, noedit: true },
	accessToken: { type: String, noedit: true },
	refreshToken: { type: String, noedit: true },
	createdAt: { type: Types.Datetime, default: Date.now, noedit: true },

	/* Additional Information */
	avatarFileUpload: { type: Types.CloudinaryImage, initial: true },
	gender: { type: String, initial: true },
	birthDay: { type: Types.Date, initial: true },
	bio: { type: Types.Textarea, initial: true }
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});


/**
 * Relationships
 */


/**
 * Registration
 */

User.defaultColumns = 'name, email|20%, birthDay|20%, gender|10%, isAdmin|10%';
User.register();
