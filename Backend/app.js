const express = require('express');

const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://gaetangobin42:VwzfKoHFEdI4MHUQ@cluster0.ej01hy4.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))
  .catch(error => handleError(error));
console.log("test")

const User = require('./models/user');
/*
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://gaetangobin42:VwzfKoHFEdI4MHUQ@cluster0.ej01hy4.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
*/

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/api/auth/signup', (req, res, next) => {
  delete req.body._id;
  const thing = new User({
    ...req.body
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Utilisateur enregistré !'}))
    .catch(error => res.status(400).json({ error }));
    /*console.log(req.body);
    res.status(201).json({
      message: 'Utilisateur créé !'
    });*/
});

app.post('/api/auth/login', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Utilisateur identifié !'
    });
});

//Route API GET "/api/books"
app.get('/api/books', (req, res, next) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(stuff);
});

//Route API GET "/api/books/:id"
app.get('/api/books/:id', (req, res, next) => {

});

//Route API GET "/api/books/bestrating"
app.get('/api/books/bestrating', (req, res, next) => {

});

module.exports = app;