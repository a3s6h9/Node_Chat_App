const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generate message', () => {
  it('should generate correct message object', () => {
    let from = 'Huncho';
    let text = 'hey wat up';

    let message = generateMessage(from, text)
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});

describe('it should create a location message', () => {
  it('should generate a correct url object', () => {
    let loc = generateLocationMessage('ash', 1, 2)
      expect(loc.from).toBe('ash');
      expect(loc.url).toBe('https://www.google.com/maps?q=1,2');
      expect(loc.createdAt).toBeA('number');
  });
});