const express = require('express');

const app = express();

const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/user');

const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config()

mongoose.connect(process.env.MONGO_SERVER)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))
  .catch(error => handleError(error));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;