var path			  = require('path')
,	 mongoose	  = require('mongoose')
,	 authenticate = require(path.join(__dirname, '../lib/index'))
,	 expect		  = require('chai').expect;

describe('Settings', function () {
	before(function (done) {
		mongoose.connect('mongodb://localhost:27017/mongoose_authenticate');
		var Account = new mongoose.Schema();
		Account.plugin(authenticate, { require: false });
		mongoose.model('AccountRequired', Account);
		this.Model = mongoose.model('AccountRequired');
		this.Model.remove({ email: 'test@example.org' }, done);
	});
	
	after(function (done) {
		mongoose.connection.close();
		done()
	});
	
	it('should override default parameter requiring for email', function () {
		expect(this.Model.schema).to.have.deep.property('paths.email.isRequired', false);
	});
	
	it('should override default parameter requiring for password', function () {
		expect(this.Model.schema).to.have.deep.property('paths.password.isRequired', false);
	});
});