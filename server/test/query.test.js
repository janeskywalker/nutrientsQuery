const { queryData } = require('../query');
const testData = {
  report: {
    foods: [
      {
        name: 'Acerola juice, raw',
        nutrients: [
          {
            nutrient_id: '203',
            nutrient: 'Protein',
            value: '0.97'
          },
          {
            nutrient_id: '204',
            nutrient: 'Total lipid (fat)',
            value: '0.73'
          },
          {
            nutrient_id: '205',
            nutrient: 'Carbohydrate, by difference',
            value: '11.62'
          },
          {
            nutrient_id: '269',
            nutrient: 'Sugars, total',
            value: '10.89'
          }
        ]
      },
      {
        name: 'Acerola, (west indian cherry), raw',
        nutrients: [
          {
            nutrient_id: '203',
            nutrient: 'Protein',
            value: '0.39'
          },
          {
            nutrient_id: '204',
            nutrient: 'Total lipid (fat)',
            value: '0.29'
          },
          {
            nutrient_id: '205',
            nutrient: 'Carbohydrate, by difference',
            value: '7.54'
          },
          {
            nutrient_id: '269',
            nutrient: 'Sugars, total',
            unit: 'g',
            value: '--',
            gm: '--'
          }
        ]
      },
      {
        name: 'Alcoholic beverage, beer, light',
        nutrients: [
          {
            nutrient_id: '203',
            nutrient: 'Protein',
            value: '0.07'
          },
          {
            nutrient_id: '204',
            nutrient: 'Total lipid (fat)',
            value: '0.00'
          },
          {
            nutrient_id: '205',
            nutrient: 'Carbohydrate, by difference',
            value: '0.48'
          },
          {
            nutrient_id: '269',
            nutrient: 'Sugars, total',
            value: '--'
          }
        ]
      }
    ]
  }
};

describe('query', () => {
  it('should show result for an "or" query', () => {
    const result = queryData({ protein: 0.07, sugar: 0.01 }, 'or', testData);

    expect(result).toEqual([
      'Acerola juice, raw',
      'Acerola, (west indian cherry), raw',
      'Alcoholic beverage, beer, light'
    ]);
  });

  it('should show result for an "and" query', () => {
    const result = queryData({ protein: 0.07, sugar: 0.02 }, 'and', testData);

    expect(result).toEqual(['Acerola juice, raw']);
  });

  it('should show result for a single query', () => {
    const result = queryData({ fat: 0.1 }, 'and', testData);

    expect(result).toEqual([
      'Acerola juice, raw',
      'Acerola, (west indian cherry), raw'
    ]);
  });

  it('should show result for an "and" query', () => {
    const result = queryData({ protein: 0.3, fat: 0.1 }, 'and', testData);

    expect(result).toEqual([
      'Acerola juice, raw',
      'Acerola, (west indian cherry), raw'
    ]);
  });

  it('should show result for an "or" query', () => {
    const result = queryData({ fat: 0.1, carb: 5 }, 'or', testData);

    expect(result).toEqual([
      'Acerola juice, raw',
      'Acerola, (west indian cherry), raw'
    ]);
  });
});
