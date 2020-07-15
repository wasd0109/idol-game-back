const handleLogin = (pg, bcrypt) => (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json('Invalid request');
  pg.select('*')
    .from('users')
    .where('username', '=', username)
    .then((data) => {
      const { id, username, hash } = data[0];
      bcrypt.compare(password, hash, (err, result) => {
        if (result === true) return res.json({ id, username });
        return res.status(404).json('Wrong credentials');
      });
    })
    .catch(() => res.status(400).json('Something went wrong'));
};

module.exports = { handleLogin };
