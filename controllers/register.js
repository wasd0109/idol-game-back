const randomizeElementAndLuck = () => {
  const elements = ['fire', 'water', 'electric', 'grass'];
  const number = Math.floor(Math.random() * 10);
  return {
    luck: number,
    element: elements[number % 4],
  };
};

const handleRegister = (pg, bcrypt) => (req, res) => {
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
};

module.exports = { handleRegister };
