const { query } = require('../query');

describe('query', () => {
  // it('should show result for an "or" query', () => {
  //   const result = query({ protein: 0.07, sugar: 0.01 }, 'or');
  // });

  // it('should show result for an "and" query', () => {
  //   const result = query({ protein: 0.07, sugar: 0.02 }, 'and');

  // });

  // it('should show result for an "or" query', () => {
  //   const result = query({ fat: 0.1 }, 'or');
  // });

  // it('should show result for an "and" query', () => {
  //   const result = query({ protein: 0.3, fat: 0.1 }, 'and');
  // });

  it('should show result for an "and" query', () => {
    const result = query({ fat: 0.1, carb: 5 }, 'or');
  });
});
