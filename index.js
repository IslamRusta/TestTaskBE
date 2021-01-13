const express = require('express');
const bodyParser = require('body-parser');

const routerUsers = require('./server/routes/routerUsers');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routerUsers);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
