var rest = require('supertest');
var should = require('should');

var server = rest.agent("http://localhost:3000");


describe("Unit test fort the REST Service", function () {
	it("should find the get movies service to be running", function (done) {
		server
			.get("/movies")
			.expect("Content-type", /json/)
			.expect(200)
			.end(function (err, res) {
				res.status.should.equal(200);
				done();
			});
	});

	it("should find the get users service to be running", function (done) {
		server
			.get("/users")
			.expect("Content-type", /json/)
			.expect(200)
			.end(function (err, res) {
				res.status.should.equal(200);
				done();
			});
	});

	it("should find the save movie service to be running", function (done) {
		server
			.post("/movies")
			.expect("Content-type", /json/)
			.expect(201)
			.end(function (err, res) {
				res.status.should.equal(201);
				done();
			});
	});

	it("should return 404", function (done) {
		server
			.get("/notfound")
			.expect("Content-type", /json/)
			.expect(404)
			.end(function (err, res) {
				res.status.should.equal(404);
				done();
			});
	});
});