const expect = require('expect');

const {isRealString} = require('./validation');

describe('is real string', () => {
  it ('should reject non string values', () => {
    let value = 123;

    let rs = isRealString(value)
      expect(rs).toBe(false);
  });

  it ('should reject values with only spaces', () => {
    let value = '    ';

    let rs = isRealString(value)
      expect(rs).toBe(false);
  });

  it ('should accept string values with spaces ion between them', () => {
    let value = '   some value for    real  ';

    let rs = isRealString(value)
      expect(rs).toBe(true);
  });
});