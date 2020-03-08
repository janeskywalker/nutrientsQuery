const nutrientIdPair = {
  protein: '203',
  fat: '204',
  carbonhydrate: '205',
  sugar: '269'
};

function validate(inputObj) {
  console.log('validating')
  console.log({ inputObj });

  const validatedObj = {};
  const errors = [];

  if (Array.isArray(inputObj.nutrients)) {
    inputObj.nutrients.forEach(element => {
      console.log({ element });
      const inputArr = element.split(':');
      if (inputArr.length !== 2) {
        errors.push('Input is invalid');
      }

      const [rawNutrient, rawValue] = inputArr;
      const inputNutrient = rawNutrient.toLowerCase();
      const inputValue = parseInt(rawValue);
      if (isNaN(inputValue)) {
        errors.push(`${rawValue} is not a number for ${inputNutrient}`);
      }

      if (nutrientIdPair.hasOwnProperty(inputNutrient)) {
        validatedObj[inputNutrient] = inputValue;
      } else {
        errors.push(`${inputNutrient} is not a valid nutrient`);
      }
    });
  }

  if (errors.length > 0) {
    return errors;
  } else {
    return validatedObj;
  }
}

module.exports = {
  validate
};
