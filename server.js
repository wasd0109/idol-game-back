const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
require('dotenv').config();

const pg = knex({
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

const randomizeElementAndLuck = () => {
  const elements = ['fire', 'water', 'electric', 'grass'];
  const number = Math.floor(Math.random() * 10);
  return {
    luck: number,
    element: elements[number % 4],
  };
};

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  pg.select('id')
    .from('users')
    .where('id', id)
    .then((data) => {
      pg.select('*')
        .from('players')
        .where('userid', data[0].id)
        .then((data) => res.json(data))
        .catch(console.log);
    })
    .catch(console.log);
});

app.post('/register', (req, res) => {
  const { username, password, name } = req.body;
  const hash = bcrypt.hashSync(password);
  const { element, luck } = randomizeElementAndLuck();
  pg.transaction((trx) => {
    trx
      .insert({ username, hash })
      .into('users')
      .returning('id')
      .then((id) => {
        const userid = id[0];
        return trx
          .insert({ userid, name, element, luck })
          .into('players')
          .catch(trx.rollback);
      })
      .then(trx.commit)
      .catch(trx.rollback);
  })
    .then(() => {
      return pg
        .select('id', 'username')
        .from('users')
        .where('username', username)
        .then((data) => res.json(data))
        .catch(console.log);
    })
    .catch((err) => res.send('Duplicate player name/user name'));
});

app.post('/action');

app.get('/login');

app.listen(3002);
