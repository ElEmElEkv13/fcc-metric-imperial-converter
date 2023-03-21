const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  suite('convertHandler', () => {
    test('should correctly read a whole number input', () => {
      const input = '10l';
      assert.equal(convertHandler.getNum(input), 10);
    });
    test('should correctly read a decimal number input', () => {
      const input = '10.5l';
      assert.equal(convertHandler.getNum(input), 10.5);
    });
    test('should correctly read a fractional input', () => {
      const input = '10/2l';
      assert.equal(convertHandler.getNum(input), 5);
    });
    test('should correctly read a fractional input with a decimal', () => {
      const input = '10.5/2l';
      assert.equal(convertHandler.getNum(input), 5.25);
    });
    test('should correctly return an error on a double-fraction', () => {
      const input = '10/2/2l';
      assert.equal(convertHandler.getNum(input), undefined);
    });
    test('should correctly default to a numerical input of 1 when no numerical input is provided.', () => {
      const input = 'l';
      assert.equal(convertHandler.getNum(input), 1);
    });
    test('should correctly read each valid input unit', () => {
      const input = ['KM', 'GaL', 'l', 'lBs', 'mI', 'kg'];
      const output = ['km', 'gal', 'L', 'lbs', 'mi', 'kg'];
      input.forEach((el, index) => {
        assert.equal(convertHandler.getUnit(el), output[index]);
      });
    });
    test('should correctly return an error for an invalid input unit', () => {
      const input = '10ll';
      assert.equal(convertHandler.getUnit(input), undefined);
    });
    test('should return the correct return unit for each valid input unit', () => {
      const input = ['KM', 'GaL', 'l', 'lBs', 'mI', 'kg'];
      const output = ['mi', 'L', 'gal', 'kg', 'km', 'lbs'];
      input.forEach((el, index) => {
        assert.equal(convertHandler.getReturnUnit(el), output[index]);
      });
    });
    test('should correctly return the spelled-out string unit for each valid input unit', () => {
      const input = ['km', 'gal', 'L', 'lbs', 'mi', 'kg'];
      const output = [
        'kilometers',
        'gallons',
        'liters',
        'pounds',
        'miles',
        'kilograms',
      ];
      input.forEach((el, index) => {
        assert.equal(convertHandler.spellOutUnit(el), output[index]);
      });
    });
    test('should correctly convert gal to L', () => {
      const input = ['5', 'gal'];
      const output = 18.92705;
      assert.equal(convertHandler.convert(input[0], input[1]), output);
    });
    test('should correctly convert L to gal', () => {
      const input = ['5', 'L'];
      const output = 1.32086;
      assert.equal(convertHandler.convert(input[0], input[1]), output);
    });
    test('should correctly convert mi to km', () => {
      const input = ['5', 'mi'];
      const output = 8.0467;
      assert.equal(convertHandler.convert(input[0], input[1]), output);
    });
    test('should correctly convert km to mi', () => {
      const input = ['5', 'km'];
      const output = 3.10686;
      assert.equal(convertHandler.convert(input[0], input[1]), output);
    });
    test('hould correctly convert lbs to kg', () => {
      const input = ['5', 'lbs'];
      const output = 2.26796;
      assert.equal(convertHandler.convert(input[0], input[1]), output);
    });
    test('should correctly convert kg to lbs', () => {
      const input = ['5', 'kg'];
      const output = 11.02312;
      assert.equal(convertHandler.convert(input[0], input[1]), output);
    });
  });
});
