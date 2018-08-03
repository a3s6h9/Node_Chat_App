const expect = require('expect');

const {generateMessage} = require('./message');

describe('generate message', () => {
  it('should generate correct message object', () => {
    let from = 'Huncho';
    let text = 'hey wat up';

    let message = generateMessage(from, text)
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });

});