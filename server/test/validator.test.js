const { validate } = require('../validation');

describe('validator', () => {
  it('should validate nutrient input', () => {
    const result = validate({
      nutrients: ['protein:2'],
      operator: 'and'
    });
    expect(result).toEqual({
      status: 'success',
      data: {
        protein: 2
      }
    });
  });

  it('should validate multiple nutrient input', () => {
    const result = validate({
      nutrients: ['protein:2', 'sugar:1'],
      operator: 'and'
    });
    expect(result).toEqual({
      status: 'success',
      data: {
        protein: 2,
        sugar: 1
      }
    });
  });

  it('should provide case insensitive validation for nutrient', () => {
    const result = validate({
      nutrients: ['Protein:2'],
      operator: 'and'
    });
    expect(result).toEqual({
      status: 'success',
      data: {
        protein: 2
      }
    });
  });

  // error message
  it('should return an error if input nutrient is not valid', () => {
    const result = validate({
      nutrients: ['iron:2'],
      operator: 'and'
    });

    expect(result).toEqual({
      status: 'error',
      data: ['iron is not a valid nutrient']
    });
  });

  // error message
  it('should return an error if input value is not a number', () => {
    const result = validate({
      nutrients: ['protein:two'],
      operator: 'and'
    });
    expect(result).toEqual({
      status: 'error',
      data: ['two is not a number for protein']
    });
  });
});
