const express = require('express');
const app = express();
const port = 3000;

app.post('/api/readData', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');

  return res.send({
    result: true,
    data: {
      contents: [
        {
          date: '2018-11-19',
          category1: '1',
          category2: '웨일즈마켓',
          payment: '4',
          amount: '5000'
        },
        {
          date: '2018-11-19',
          category1: '3',
          category2: '택시',
          payment: '1',
          amount: '12000'
        },
        {
          date: '2018-11-19',
          category1: '2',
          category2: '영화',
          payment: '3',
          amount: '10000'
        }
      ]
    }
  });
});

app.post('/api/updateData', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');

  return res.send({
    result: true,
    data: {
      modifyType: 'update'
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
