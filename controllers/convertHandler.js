function ConvertHandler() {
  function divCheck(input) {
    const nums = input.split('/');
    if (nums.length > 2) return undefined;
    return nums;
  }
  const units = ['km', 'gal', 'l', 'lbs', 'mi', 'kg'];

  this.getNum = function (input) {
    const arr = input.match(/[.\d\/]+/g) || ['1'];

    const nums = divCheck(arr[0]);
    if (!nums) return undefined;

    const result = parseFloat(nums[0]) / parseFloat(nums[1] || 1);

    return result;
  };

  this.getUnit = function (input) {
    let result = input.match(/[a-zA-Z]+/g)[0].toLowerCase();

    if (result === 'l') return 'L';
    else if (units.includes(result)) return result;
    else return undefined;
  };

  this.getReturnUnit = function (initUnit) {
    switch (initUnit.toLowerCase()) {
      case 'km':
        return 'mi';
      case 'gal':
        return 'L';
      case 'lbs':
        return 'kg';
      case 'mi':
        return 'km';
      case 'l':
        return 'gal';
      case 'kg':
        return 'lbs';
    }
  };

  this.spellOutUnit = function (unit) {
    switch (unit.toLowerCase()) {
      case 'km':
        return 'kilometers';
      case 'gal':
        return 'gallons';
      case 'lbs':
        return 'pounds';
      case 'mi':
        return 'miles';
      case 'l':
        return 'liters';
      case 'kg':
        return 'kilograms';
      default:
        return undefined;
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit.toLowerCase()) {
      case 'km':
        result = initNum / miToKm;
        break;
      case 'gal':
        result = initNum * galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        return undefined;
    }

    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
