var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */

var User = new keystone.List('User');

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
	provider: { type: String },
	providerId: { type: String },

	/* Additional Information */
	avatar: { type: Types.CloudinaryImage, initial: true },
	gender: { type: Types.Boolean, initial: true },
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
