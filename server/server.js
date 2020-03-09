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

  const validationResult = validate(req.query);

  if (validationResult.status === 'error') {
    res.json({ status: 400, message: validationResult.data });
  } else {
    const queryResult = query(validationResult.data, operator);
    res.json({ status: 200, message: queryResult });
  }
});

module.exports = app;
