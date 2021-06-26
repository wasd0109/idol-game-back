const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    playerName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    HP: {
      type: Number,
      default: 100,
    },
    element: {
      type: String,
      require: true,
    },
    level: {
      type: Number,
      default: 1,
    },
    exp: {
      type: Number,
      default: 0,
    },
    attack: {
      type: Number,
      default: 20,
    },
    defense: {
      type: Number,
      default: 15,
    },
    magicAttack: {
      type: Number,
      default: 30,
    },
    magicDefense: {
      type: Number,
      default: 25,
    },
    agility: {
      type: Number,
      default: 10,
    },
    luck: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
