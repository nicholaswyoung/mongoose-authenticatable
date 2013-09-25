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