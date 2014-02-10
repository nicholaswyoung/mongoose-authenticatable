module.exports = function(schema, options) {
	var bcrypt = require('bcrypt')
	,	 options = options || {};
	
	if (options.require) options.require = options.require;
	
	schema.add({
		email: {
			type: String,
			required: options.require,
			unique: true
		},
		password: {
			type: String,
			required: options.require
		}
	});

	schema.virtual('password_confirmation')
	.get(function () {
		return this._password_confirmation;
	}).set(function (value) {
		this._password_confirmation = value;
	});

	schema.path('password').validate(function (value) {
		if (this.password || this._password_confirmation) {
			if (this.password != this.password_confirmation) {
				this.invalidate('password', 'must match confirmation.');
			}
			if (value.length < 6) {
				this.invalidate('password', 'must be at least 6 characters in length.')
			}
		}
		if (this.isNew && !this.password) {
			this.invalidate('password', 'required')
		}
	}, null);
	
	schema.pre('save', function(next) {
		var _this = this;
		if (!this.isModified('password')) return next();
		bcrypt.genSalt(10, function(err, salt) {
			if (err) return next(err);
			bcrypt.hash(_this.password, salt, function(err, hash) {
				if (err) return next(err);
				_this.password = hash;
				next();
			});
		});
	});
	
	schema.methods.authenticate = function(password, callback) {
		bcrypt.compare(password, this.password, function(err, valid) {
			if (err) return callback(err);
			if (valid) return callback(null, true);
			callback(null, false);
		});
	};
	
	schema.virtual('passwordAuthenticatable').get(function () {
		if (this.email != '' && this.password != '') return true;
		return false;
	})
};