const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  topic: String,
  word: String,
  example: String,
  context: String,
  img: String,
  translation: String,
  exampleTranslation: String,
  contextTranslation: String
});

module.exports = mongoose.model('card', cardSchema);
