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
  if (!username || !password || !name)
    return res.status(400).json('Invalid request');
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
          .catch(res.json('Player name already exist'));
      })
      .then(trx.commit)
      .catch(() => {
        if (!res._headerSent) res.json('User name already exist');
        trx.rollback;
      });
  })
    .then(() => {
      return pg
        .select('id', 'username')
        .from('users')
        .where('username', username)
        .then((data) => res.json(data))
        .catch(res.status(404));
    })
    .catch((err) => console.log(err));
};

module.exports = { handleRegister };
