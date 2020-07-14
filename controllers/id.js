const handleGetProfile = (pg) => (req, res) => {
  const { id } = req.params;
  pg.select('*')
    .from('players')
    .where('userid', '=', Number(id))
    .then((data) => res.json(data))
    .catch(console.log);
};

module.exports = { handleGetProfile };
