const handleLogin = (pg, bcrypt) => (req, res) => {
  const { username, password } = req.body;
  pg.select('*')
    .from('users')
    .where('username', '=', username)
    .then((data) => {
      const { id, username, hash } = data[0];
      bcrypt.compare(password, hash, (err, result) => {
        if (result) res.json({ id, username });
        else res.status(404).send('Error signing in');
      });
    })
    .catch(() => res.status(400).send('Error signing in'));
};

module.exports = { handleLogin };
