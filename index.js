require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const middlewares = require('./controllers/middlewares');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsController);
app.use('/sales', salesController);

app.use(middlewares.domainError);
app.use(middlewares.error);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
