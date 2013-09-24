path 			 = require('path')
mongoose 	 = require('mongoose')
authenticate = require path.join(__dirname, '../lib/index')
expect 		 = require('chai').expect

# Setup Test Model
account = new mongoose.Schema()
account.plugin(authenticate)
mongoose.model('Account', account)
mongoose.connect('mongodb://localhost:27017/mongoose_authenticate')

Model = mongoose.model('Account')

describe 'Model', ->
	before (done) -> Model.remove(email: 'test@example.org', done)
	
	it 'should store email', ->
		expect(Model.schema).to.have.deep.property('paths.email')
	it 'should store password', ->
		expect(Model.schema).to.have.deep.property('paths.password')
	it 'should require email', ->
		expect(Model.schema).to.have.deep.property('paths.email.isRequired', true)
	it 'should require password', ->
		expect(Model.schema).to.have.deep.property('paths.password.isRequired', true)
		
	describe '#authenticate', ->
		before (done) ->
			@account = new Model(email: 'test@example.org', password: '123456789')
			@account.save(done)

		it 'should fail with an incorrect password', (done) ->
			@account.authenticate '123', (err, authenticated) ->
				return done(err) if err
				expect(authenticated).to.equal(false)
				done()
				
		it 'should succeed with the correct password', (done) ->
			@account.authenticate '123456789', (err, authenticated) ->
				return done(err) if err
				expect(authenticated).to.equal(true)
				done()