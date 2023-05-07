const mongoose = require('mongoose');

const villainSchema = mongoose.Schema({
  name: String,
  power: Number,
});

const VillainModel = mongoose.model('supervillain', villainSchema);

module.exports = VillainModel;
