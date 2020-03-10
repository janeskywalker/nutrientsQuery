const { mockData } = require('../server/mockData');

const nutrientIdPair = {
  protein: '203',
  fat: '204',
  carb: '205',
  sugar: '269'
};

function hasAnyNutrient(food, validatedObj) {
  for (key in validatedObj) {
    for (item of food.nutrients) {
      if (
        item.nutrient_id === nutrientIdPair[key] &&
        parseFloat(item.value) >= validatedObj[key]
      ) {
        return true;
      }
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

function queryData(validatedObj, operator, data) {
  console.log('making queries');
  const foods = data.report.foods;
  let queryResult = [];

  if (operator === 'or') {
    console.log('this is an "or" query');
    for (food of foods) {
      if (hasAnyNutrient(food, validatedObj)) {
        queryResult.push(food.name);
      }
    }
  }

  if (operator === 'and') {
    console.log('this is an "and" query');
    for (food of foods) {
      if (hasAllNutrients(food, validatedObj)) {
        queryResult.push(food.name);
      }
    }
  }

  console.log('query result:', queryResult);
  // queryResult = [...new Set(queryResult)];
  return queryResult;
}

function query(validatedObj, operator) {
  return queryData(validatedObj, operator, mockData);
}

module.exports = {
  queryData,
  query
};
