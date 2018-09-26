const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const api = require('./routes/api')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/api', api);

mongoose.connect('mongodb://localhost/flashcards')
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error(`Couldn't connect to MongoDB ${error}`));

const cardSchema = new mongoose.Schema({
  topic: String,
  word: String,
  example: String,
  context: String,
  translation: String,
  exampleTranslation: String,
  contextTranslation: String
});

async function createCard(card) {
  const Card = mongoose.model('Card', cardSchema);
  Card.insert(card);
};

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, '../dist/english-flashcards')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/english-flashcards/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost ${port}`));
