module.exports = (schema, options) ->
	bcrypt = require('bcrypt')
	
	schema.add
		email:
			type: String
			required: true
			unique: true
		password:
			type: String
			required: true
	
	schema.pre 'save', (next) ->
		return next() unless @isModified('password')
		bcrypt.genSalt 10, (err, salt) =>
			return next(err) if err
			bcrypt.hash @password, salt, (err, hash) =>
				return next(err) if err
				@password = hash
				next()
				
	schema.methods.authenticate = (password, callback) ->
		bcrypt.compare password, @password, (err, valid) ->
			return callback(err) if err
			return callback(null, true) if valid
			callback(null, false)