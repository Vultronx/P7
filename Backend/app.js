/**
* * Comment 
* ! Alerte
* ? To be checked
*/

//* Importation d'Express et déclaration de l'app
const express = require('express');
const app = express();

//* Importation des routes
const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/user');

//* Importation de Mongoose et de Path
const mongoose = require('mongoose');
const path = require('path');

//* Importation et configuration de Dotenv
require('dotenv').config();

//* Connexion à la BDD par l'intermédiaire de Mongoose
//* L'adresse de la BDD est stockée dans un fichier ENV afin d'être sécurisée
mongoose.connect(process.env.MONGO_SERVER)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))
  .catch(error => handleError(error));

//* Configuration de l'app
app.use(express.json());

//* Permission des requetes cross-origin
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


//* Définition des points d'accès
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);

//* Exportation de l'app
module.exports = app;