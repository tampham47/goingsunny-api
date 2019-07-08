var keystone = require('keystone');
var Types = keystone.Field.Types;

var myStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: keystone.expandPath('./public/uploads'),
    publicPath: '/public/uploads',
    generateFilename: (item, file) => {
      const extReg = /\.[0-9a-z]+$/i;
      const { originalname } = item;
      let ext = originalname.match(extReg);
      return `${item.filename}${ext}`;
    }
  },
});

var User = new keystone.List('User', {
  defaultSort: '-lastAccessedAt'
});

User.add({
  name: { type: Types.Name, required: true, default: 'Thành viên mới', index: true },
  email: { type: Types.Email, initial: true, required: true, default: 'noemail@com.com', index: true },
  password: { type: Types.Password, initial: true, required: true, default: 'nopass', access: 'protected' },
  displayName: { type: String, default: 'Thành viên mới' },
  username: { type: String },
  phoneNumber: { type: String },

  facebookProfile: { type: Types.Url },
  hacknaoPoint: { type: Number },
  hacknaoRanking: { type: Number },

  interests: { type: Types.TextArray }, // `xem phim, nghe nhạc, đọc sách`
  rating: {
    value: { type: Number, noedit: true },
    amount: { type: Number, default: 0, noedit: true },
  },

  provider: { type: String, noedit: true },
  providerId: { type: String, noedit: true },
  profileUrl: { type: String, noedit: true },
  accessToken: { type: String, noedit: true, access: 'protected' },
  refreshToken: { type: String, noedit: true, access: 'protected' },
  avatar: { type: String, noedit: true },

  zoomApp: {
    installed: { type: Boolean, default: false },
    verified: { type: Boolean },
    PMI: { type: String },
  },

  roles: { type: Types.TextArray }, // `tutor,admin`
  displayRole: { type: String },
  isVerified: { type: Boolean, default: false },
  lastAccessedAt: { type: Types.Datetime, noedit: true },
  createdAt: { type: Types.Datetime, default: Date.now, noedit: true },

  /* Additional Information */
  avatarFileUpload: {
    type: Types.File,
    storage: myStorage,
  },
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

User.defaultColumns = 'name, displayName, hacknaoPoint|15%, roles|15%, lastAccessedAt|20%';
User.register();
