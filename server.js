const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const action = require('./controllers/action');
const id = require('./controllers/id');
const login = require('./controllers/login');
const register = require('./controllers/register');
const players = require('./controllers/players');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const pg =
  process.env.NODE_ENV === 'production'
    ? knex({
        client: 'pg',
        connection: {
          connectionString: process.env.DATABASE_URL,
          ssl: {
            rejectUnauthorized: false,
          },
        },
      })
    : knex({
        client: 'pg',
        connection: {
          host: '127.0.0.1',
          user: 'wasd0109',
          password: process.env.DATABASE_PASSWORD,
          database: 'idolgame',
        },
      });

const app = express();

app.use(express.json());
app.use(cors());

app.get('/profile/:id', id.handleGetProfile(pg));

app.get('/players', players.handleGetPlayers(pg));

app.post('/login', login.handleLogin(pg, bcrypt));

app.post('/register', register.handleRegister(pg, bcrypt));

app.post('/action', action.handleAction(pg));

app.listen(process.env.PORT || 3001);
