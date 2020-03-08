const { validate } = require('./validation');
const { query } = require('./query');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/foods', (req, res) => {
  console.log('queryObj:', req.query);
  const operator = req.query.operator || 'and';

  const validatedObj = validate(req.query);
  console.log({ validatedObj });

  const queryResult = query(validatedObj, operator);

  res.json('responseData');
});

module.exports = app;

// validation:
// helper function: build a data structure to store input to a hashmap
// validate input so the nutrients are one of the four
// error: invalid nutrient name
// value make sure number
// error: value for nutrient must be a number (http error code for bad request, bad input 400 - user error, 500 server error)

// query:
// does this food have request nutrient of the request value
