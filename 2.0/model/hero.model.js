const mongoose = require('mongoose');

const heroSchema = mongoose.Schema({
  name: String,
  language: String,
  city: String,
  power: Number,
  is_active: Boolean,
  villain: String,
});

const HeroModel = mongoose.model('superheroe', heroSchema);

module.exports = HeroModel;