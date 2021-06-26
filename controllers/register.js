const User = require('../models/users');
const randomizeElementAndLuck = () => {
  const elements = ['fire', 'water', 'electric', 'grass'];
  const number = Math.floor(Math.random() * 10);
  return {
    luck: number,
    element: elements[number % 4],
  };
};

const handleRegister = (bcrypt) => async (req, res) => {
  const { username, password, playerName } = req.body;
  if (!username || !password || !playerName)
    return res.status(400).json('Invalid request');
  const hash = bcrypt.hashSync(password);
  const { element, luck } = randomizeElementAndLuck();

  const usernameExist = await User.exists({ username });
  const playerNameExist = await User.exists({ playerName });

  if (usernameExist && playerNameExist)
    return res.json('Username and player name already exist');
  else if (playerNameExist) return res, json('Player Name already exist');
  else if (usernameExist) res.json('Username already exist');
  else {
    const user = new User({
      username,
      playerName,
      password: hash,
      element,
      luck,
    });
    try {
      const result = user.save(res.json(result));
    } catch (err) {
      res.json(err);
    }
  }
};

module.exports = { handleRegister };
