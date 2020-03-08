const { mockData } = require('../server/mockData');

const nutrientIdPair = {
  protein: '203',
  fat: '204',
  carb: '205',
  sugar: '269'
};

function hasNutrient(nutrients, nutrient, value) {
  for (item of nutrients) {
    console.log({ item });
    if (
      item.nutrient_id === nutrientIdPair[nutrient] &&
      parseFloat(item.value) >= value
    ) {
      return true;
    }
  }
  return false;
}

function hasAllNutrients(food, validatedObj) {
  // if the food nutrients array has all the keys with the value
  for (key in validatedObj) {
    for (item of food.nutrients) {
      if (item.nutrient_id === nutrientIdPair[key] && item.value === '--') {
        return false;
      }
      if (
        item.nutrient_id === nutrientIdPair[key] &&
        item.value < validatedObj[key]
      ) {
        return false;
      }
    }
  }
  return true;
}

function query(validatedObj, operator) {
  console.log('making queries');
  const foods = mockData.report.foods;
  let queryResult = [];

  if (operator === 'or') {
    console.log('this is an or query');
    for (key in validatedObj) {
      for (food of foods) {
        if (hasNutrient(food.nutrients, key, validatedObj[key])) {
          queryResult.push(food.name);
        }
      }
    }
  }

  if (operator === 'and') {
    console.log('this is an and query');
    for (food of foods) {
      if (hasAllNutrients(food, validatedObj)) {
        queryResult.push(food.name);
      }
    }
  }

  queryResult = [...new Set(queryResult)];

  console.log('query result:', queryResult);
}

module.exports = {
  query
};
