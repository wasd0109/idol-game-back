const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const action = require('./controllers/action');
const id = require('./controllers/id');
const login = require('./controllers/login');
const register = require('./controllers/register');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const pg = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/profile/:id', id.handleGetProfile);

app.post('/login', login.handleLogin(pg, bcrypt));

app.post('/register', register.handleRegister(pg, bcrypt));

app.post('/action', action.handleAction(pg));

app.listen(process.env.PORT || 3002);
