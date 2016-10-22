/**
 * 
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Enquiry Model
 * =============
 */

var Enquiry = new keystone.List('Enquiry', {
	nocreate: true,
	noedit: true
});

Enquiry.add({
	_user: { type: Types.Relationship, ref: 'User', initial: true, index: true },
	// name: { type: String },
	// email: { type: Types.Email },
	// phone: { type: String },
	message: { type: Types.Textarea, initial: true, required: true },
	enquiryType: { 
		type: Types.Select, options: [
			{ value: 'message', label: 'Just leaving a message' },
			{ value: 'question', label: 'I\'ve got a question' },
			{ value: 'other', label: 'Something else...' }
		],
		default: 'message'
	},
	createdAt: { type: Date, default: Date.now }
});

Enquiry.schema.pre('save', function(next) {
	this.wasNew = this.isNew;
	next();
});

Enquiry.schema.post('save', function() {
	if (this.wasNew) {
		this.sendNotificationEmail();
	}
});

Enquiry.schema.methods.sendNotificationEmail = function(callback) {
	
	if ('function' !== typeof callback) {
		callback = function() {};
	}
	
	var enquiry = this;
	
	keystone.list('User').model.find().where('isAdmin', true).exec(function(err, admins) {
		
		if (err) return callback(err);
		
		new keystone.Email('enquiry-notification').send({
			to: admins,
			from: {
				name: 'GoingsunnyDatacenter',
				email: 'contact@goingsunnydatacenter.com'
			},
			subject: 'New Enquiry for GoingsunnyDatacenter',
			enquiry: enquiry
		}, callback);
		
	});
	
};

Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = '_user, message, enquiryType, createdAt';
Enquiry.register();
