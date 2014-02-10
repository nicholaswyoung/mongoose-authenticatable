var path			  = require('path')
,	 mongoose	  = require('mongoose')
,	 authenticate = require(path.join(__dirname, '../lib/index'))
,	 expect		  = require('chai').expect;

describe('Model Schema', function () {
	before(function (done) {
		mongoose.connect('mongodb://localhost:27017/mongoose_authenticate');
		var Account = new mongoose.Schema();
		Account.plugin(authenticate);
		mongoose.model('AccountSchema', Account);
		this.Model = mongoose.model('AccountSchema');
		this.Model.remove({ email: 'test@example.org' }, done);
	});
	
	after(function (done) {
		mongoose.connection.close();
		done()
	});
	
	it('should store email', function () {
		expect(this.Model.schema).to.have.deep.property('paths.email')
	});
	
	it('should store password', function () {
		expect(this.Model.schema).to.have.deep.property('paths.password')
	});

	it('should store a virtual password_confirmation', function () {
		expect(this.Model.schema).to.have.deep.property('virtuals.password_confirmation');
	});
	
	describe('Defaults', function () {
		it('should require email', function () {
			expect(this.Model.schema).to.have.deep.property('paths.email.isRequired', true);
		});
		
		it ('should require password', function () {
			expect(this.Model.schema).to.have.deep.property('paths.password.isRequired', true);
		});
	});
});