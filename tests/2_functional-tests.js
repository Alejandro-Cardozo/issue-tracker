const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  // suite('POST Requests', function () {
  //   // #1
  //   test('Create an issue with every field', function (done) {
  //     chai
  //       .request(server)
  //       .post('/api/issues/:project')
  //       .type('form')
  //       .send({
  //         issue_title: 'Fix error in posting data',
  //         issue_text: 'When we post data it has an error.',
  //         created_by: 'Joe',
  //         assigned_to: 'Joe',
  //         status_text: 'In QA',
  //       })
  //       .end(function (err, res) {
  //         assert.equal(res.status, 200);
  //         assert.equal(res.type, 'application/json');
  //         assert.equal(res.body.issue_title, 'Fix error in posting data');

  //         done();
  //       });
  //   });
  //   // #2
  //   test('Create an issue with only required fields', function (done) {
  //     chai
  //       .request(server)
  //       .post('/api/issues/:project')
  //       .type('form')
  //       .send({
  //         issue_title: 'Update legacy libraries',
  //         issue_text: 'Update every outdated library',
  //         created_by: 'Moe',
  //       })
  //       .end(function (err, res) {
  //         assert.equal(res.status, 200);
  //         assert.equal(res.type, 'application/json');
  //         assert.equal(res.body.issue_title, 'Update legacy libraries');

  //         done();
  //       });
  //   });
  //   // #3
  //   test('Create an issue with missing required fields', function (done) {
  //     chai
  //       .request(server)
  //       .post('/api/issues/:project')
  //       .type('form')
  //       .send({
  //         assigned_to: 'Joe',
  //         status_text: 'In QA',
  //       })
  //       .end(function (err, res) {
  //         assert.equal(res.status, 422);
  //         assert.equal(res.type, 'application/json');
  //         assert.equal(res.body.message, 'invalid input');

  //         done();
  //       });
  //   });
  // });
  // suite('GET Requests', function () {
  //   // #4
  //   test('View issues on a project', function (done) {
  //     chai
  //       .request(server)
  //       .get('/api/issues/:project')
  //       .end(function (err, res) {
  //         assert.equal(res.status, 200);
  //         assert.equal(res.type, 'application/json');
  //         done();
  //       });
  //   });
  //   // #5
  //   test('View issues on a project with one filter', function (done) {
  //     chai
  //       .request(server)
  //       .get('/api/issues/:project?open=true')
  //       .end(function (err, res) {
  //         assert.equal(res.status, 200);
  //         assert.equal(res.type, 'application/json');
  //         done();
  //       });
  //   });
  //   // #6
  //   test('View issues on a project with multiple filters', function (done) {
  //     chai
  //       .request(server)
  //       .get('/api/issues/:project?open=true&created_by=Ash')
  //       .end(function (err, res) {
  //         assert.equal(res.status, 200);
  //         assert.equal(res.type, 'application/json');
  //         done();
  //       });
  //   });
  // });
  // suite('PUT Requests', function () {
  //   // #7
  //   test('Update one field on an issue', function (done) {
  //     chai
  //       .request(server)
  //       .put('/api/issues/:project')
  //       .send({ _id: '63c5a9c7230a9948ebc14892', issue_text: 'New text' })
  //       .end(function (err, res) {
  //         assert.isNull(err);
  //         assert.equal(res.status, 200);
  //         assert.equal(res.type, 'application/json');
  //         assert.equal(res.body.result, 'successfully updated');
  //         done();
  //       });
  //   });
  //   // #8
  //   test('Update multiple fields on an issue', function (done) {
  //     chai
  //       .request(server)
  //       .put('/api/issues/:project')
  //       .send({ _id: '63c5a9c7230a9948ebc14892', issue_text: 'New issue', assigned_to: 'Marcus' })
  //       .end(function (err, res) {
  //         assert.isNull(err);
  //         assert.equal(res.status, 200);
  //         assert.equal(res.type, 'application/json');
  //         assert.equal(res.body.result, 'successfully updated');
  //         done();
  //       });
  //   });
  //   // #9
  //   test('Update an issue with missing _id', function (done) {
  //     chai
  //       .request(server)
  //       .put('/api/issues/:project')
  //       .send({ issue_text: 'New issue', assigned_to: 'Marcus' })
  //       .end(function (err, res) {
  //         assert.isNull(err);
  //         assert.equal(res.status, 422);
  //         assert.equal(res.type, 'application/json');
  //         assert.equal(res.body.message, 'invalid input');
  //         done();
  //       });
  //   });
  //   // #10
  //   test('Update an issue with no fields to update', function (done) {
  //     chai
  //       .request(server)
  //       .put('/api/issues/:project')
  //       .send({ _id: '63c5a9c7230a9948ebc14892' })
  //       .end(function (err, res) {
  //         assert.isNull(err);
  //         assert.equal(res.status, 200);
  //         assert.equal(res.type, 'application/json');
  //         assert.equal(res.body.result, 'successfully updated');
  //         done();
  //       });
  //   });
  //   // #11
  //   test('Update an issue with an invalid _id', function (done) {
  //     chai
  //       .request(server)
  //       .put('/api/issues/:project')
  //       .send({ _id: '630cc27e4fc5c809ff71d159', issue_text: 'New issue', assigned_to: 'Marcus' })
  //       .end(function (err, res) {
  //         assert.isNull(err);
  //         assert.equal(res.status, 422);
  //         assert.equal(res.type, 'application/json');
  //         assert.equal(res.body.message, 'invalid input');
  //         done();
  //       });
  //   });
  // });
  suite('DELETE Requests', function () {
    // #12
    test('Delete an issue', function (done) {
      chai
        .request(server)
        .delete('/api/issues/:project')
        .send({ _id: '63c83c3ec3212d5d40ee2f57' })
        .end(function (err, res) {
          assert.isNull(err);
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.result, 'successfully deleted');
          done();
        });
    });
    // #13
    test('Delete an issue with an invalid _id', function (done) {
      chai
        .request(server)
        .delete('/api/issues/:project')
        .send({ _id: '630cc27e4fc5c809ff71d159' })
        .end(function (err, res) {
          assert.isNull(err);
          assert.equal(res.status, 422);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.message, 'invalid _id');
          done();
        });
    });
    // #14
    test('Delete an issue with missing _id', function (done) {
      chai
        .request(server)
        .delete('/api/issues/:project')
        .send({})
        .end(function (err, res) {
          assert.isNull(err);
          assert.equal(res.status, 422);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.message, 'invalid _id');
          done();
        });
    });
  });
});
