var path			  = require('path')
,	 mongoose	  = require('mongoose')
,	 authenticate = require(path.join(__dirname, '../lib/index'))
,	 expect		  = require('chai').expect;

describe('Authentication', function () {
	before(function (done) {
		mongoose.connect('mongodb://localhost:27017/mongoose_authenticate');
		var Account = new mongoose.Schema();
		Account.plugin(authenticate);
		mongoose.model('AccountAuthentication', Account);
		this.Model = mongoose.model('AccountAuthentication');
		this.Model.remove({ email: 'test@example.org' }, done);
	});
	
	after(function (done) {
		mongoose.connection.close();
		done()
	});
	
	describe('#authenticate', function () {
		before(function (done) {
			this.account = new this.Model({ email: 'test@example.org', password: '123456', password_confirmation: '123456' });
			this.account.save(done);
		});
		
		it('should fail with an incorrect password', function (done) {
			this.account.authenticate('123', function (err, authenticated) {
				if (err) return done(err);
				expect(authenticated).to.equal(false);
				done();
			});
		});
		
		it ('should succeed with the correct password', function (done) {
			this.account.authenticate('123456', function (err, authenticated) {
				if (err) return done(err);
				expect(authenticated).to.equal(true);
				done();
			});
		});
	});
});