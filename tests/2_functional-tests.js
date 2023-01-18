const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  suite('POST requests', function () {
    // #1
    test('Create an issue with every field', function (done) {
      chai
        .request(server)
        .post('/api/issues/:project')
        .type('form')
        .send({
          issue_title: 'Fix error in posting data',
          issue_text: 'When we post data it has an error.',
          created_by: 'Joe',
          assigned_to: 'Joe',
          status_text: 'In QA',
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.issue_title, 'Fix error in posting data');

          done();
        });
    });
    // #2
    test('Create an issue with only required fields', function (done) {
      chai
        .request(server)
        .post('/api/issues/:project')
        .type('form')
        .send({
          issue_title: 'Update legacy libraries',
          issue_text: 'Update every outdated library',
          created_by: 'Moe',
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.issue_title, 'Update legacy libraries');

          done();
        });
    });
    // #3
    test('Create an issue with missing required fields', function (done) {
      chai
        .request(server)
        .post('/api/issues/:project')
        .type('form')
        .send({
          assigned_to: 'Joe',
          status_text: 'In QA',
        })
        .end(function (err, res) {
          assert.equal(res.status, 422);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.message, 'invalid input');

          done();
        });
    });
  });
  // suite('Invalid requests', function() {
  //   // #3
  //   test('Convert an invalid input', function(done) {
  //     chai
  //       .request(server)
  //       .get('/api/convert?input=32g')
  //       .end(function(err, res) {
  //         assert.equal(res.status, 200);
  //         assert.equal(res.text, 'invalid unit');
  //         done();
  //       });
  //   });
  //   // #4
  //   test('Convert an invalid number', function(done) {
  //     chai
  //       .request(server)
  //       .get('/api/convert?input=3/7.2/4kg')
  //       .end(function(err, res) {
  //         assert.equal(res.status, 200);
  //         assert.equal(res.text, 'invalid number');
  //         done();
  //       });
  //   });
  //   // #5
  //   test('Convert an invalid number AND unit', function(done) {
  //     chai
  //       .request(server)
  //       .get('/api/convert?input=3/7.2/4kilomegagram')
  //       .end(function(err, res) {
  //         assert.equal(res.status, 200);
  //         assert.equal(res.text, 'invalid number and unit');
  //         done();
  //       });
  //   });
  // });
});
