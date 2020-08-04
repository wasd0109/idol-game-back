const handleGetPlayers = (pg) => (req, res) => {
  pg.select('id', 'name', 'title', 'level', 'element', 'message')
    .from('players')
    .then((data) => res.json(data));
};

module.exports = { handleGetPlayers };
