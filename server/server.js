const mockData = require('./mockData').mockData;

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const nutrientIdPair = {
  protien: '203',
  fat: '204',
  carbonhydrate: '205',
  sugar: '269'
};

app.get('/foods', (req, res) => {
  console.log(req.query);

  const operator = req.query.operator || 'and';

  // helper function: build a data structure to store input to a hashmap

  const nutrients = {
    protein: 2
  };

  // validate input so the nutrients are one of the four
  // error: invalid nutrient name

  // value make sure number
  // error: value for nutrient must be a number (http error code for bad request, bad input 400 - user error, 500 server error)

  // does this food have request nutrient of the request value

  res.json('responseData');
});

module.exports = app;
