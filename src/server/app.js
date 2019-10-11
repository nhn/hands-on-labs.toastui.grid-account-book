const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const contents = [
  {
    id: 1,
    date: '2019-11-27',
    category1: '1',
    category2: '웨일즈마켓',
    payment: '2',
    amount: '5000'
  },
  {
    id: 2,
    date: '2019-11-27',
    category1: '3',
    category2: '택시',
    payment: '1',
    amount: '12000'
  },
  {
    id: 3,
    date: '2019-11-27',
    category1: '2',
    category2: '영화',
    payment: '3',
    amount: '10000'
  }
];

app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  // allow preflight
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

app.get('/api/readData', (req, res) => res.send({
  result: true,
  data: {
    contents
  }
}));

app.put('/api/updateData', (req, res) => {
  const rows = req.body.updatedRows;

  rows.forEach(row => {
    const index = row.id - 1;

    contents[index] = row;
  });

  return res.send({
    result: true,
    data: {}
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
