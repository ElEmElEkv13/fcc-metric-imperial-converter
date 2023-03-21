const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
  test('Convert a valid input', () => {
    input = '10L';
    chai
      .request(server)
      .get('/api/convert')
      .query({ input })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, 'L');
        assert.equal(res.body.returnNum, 2.64172, 0.1);
        assert.equal(res.body.returnUnit, 'gal');
      });
  });
  test('Convert an invalid input', () => {
    input = '32g';
    chai
      .request(server)
      .get('/api/convert')
      .query({ input })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initUnit, undefined);
      });
  });
  test('Convert an invalid number', () => {
    input = '3/7.2/4kg';
    chai
      .request(server)
      .get('/api/convert')
      .query({ input })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initUnit, undefined);
      });
  });
  test('Convert an invalid number AND unit', () => {
    input = '3/7.2/4kilomegagram';
    chai
      .request(server)
      .get('/api/convert')
      .query({ input })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, undefined);
        assert.equal(res.body.initUnit, undefined);
      });
  });
  test('Convert with no number such', () => {
    input = 'kg';
    chai
      .request(server)
      .get('/api/convert')
      .query({ input })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'kg');
        assert.equal(res.body.returnNum, 2.20462, 0.1);
        assert.equal(res.body.returnUnit, 'lbs');
      });
  });
});
