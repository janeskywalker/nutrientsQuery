const { validate } = require('./validation');
const { query } = require('./query');

const path = require('path');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const publicDir = path.join(__dirname, 'public');

app.get('/', function(req, res) {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.use('/', express.static(publicDir));

app.get('/foods', (req, res) => {
  console.log('queryObj:', req.query);
  const operator = req.query.operator || 'and';

  if (operator !== 'and' && operator !== 'or') {
    res.status(400).json({ message: [`Invalid operator ${operator}`] });
  } else {
    const validationResult = validate(req.query);

    if (validationResult.status === 'error') {
      res.status(400).json({ message: validationResult.data });
    } else {
      const queryResult = query(validationResult.data, operator);
      res.json({ message: queryResult });
    }
  }
});

module.exports = app;
