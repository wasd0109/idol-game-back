const handleGetProfile = (pg) => (req, res) => {
  const { id } = req.params;
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
