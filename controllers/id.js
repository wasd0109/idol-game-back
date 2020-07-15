const handleGetProfile = (pg) => (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json('Invalid request');
  console.log(id);
  pg.select('*')
    .from('players')
    .where('userid', '=', Number(id))
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch(console.log);
};

module.exports = { handleGetProfile };
