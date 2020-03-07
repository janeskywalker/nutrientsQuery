const { validate } = require('../validation');

describe('validator', () => {
  it('should do something', () => {
    const result = validate({
      nutrients: 'protein:2',
      operator: '2'
    });

    console.log({ result });

    expect(result).toEqual({
      protein: 2
    });
  });

  it('should do something', () => {
    const result = validate({
      nutrients: 'coffee:2',
      operator: '2'
    });

    console.log({ result });

    expect(result).toEqual({
      protein: 2
    });
  });
});
