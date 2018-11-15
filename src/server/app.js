const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const contents = [
  {
    id: 1,
    date: '2018-11-19',
    category1: '1',
    category2: '웨일즈마켓',
    payment: '4',
    amount: '5000'
  },
  {
    id: 2,
    date: '2018-11-19',
    category1: '3',
    category2: '택시',
    payment: '1',
    amount: '12000'
  },
  {
    id: 3,
    date: '2018-11-19',
    category1: '2',
    category2: '영화',
    payment: '3',
    amount: '10000'
  }
];

app.use(bodyParser.urlencoded({extended: true}));

app.post('/api/readData', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');

  return res.send({
    result: true,
    data: {
      contents
    }
  });
});

app.post('/api/updateData', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');

  const rows = JSON.parse(req.body.updatedRows);

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
