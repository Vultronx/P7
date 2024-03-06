// Importez les modules requis
const sharp = require('sharp');
const multer = require('multer');

// Configurez multer pour gérer les téléversements de fichiers
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Définissez la fonction sharpImage
const sharpImage = (req, res, next) => {
  // Utilisez `upload.single` pour traiter le fichier envoyé dans la requête
  upload.single("image")(req, res, async (error) => {
      const { buffer, originalname } = req.file;
      const timestamp = Date.now();
      const ref = originalname + '.' + timestamp + '.webp';

      // Utilisez Sharp pour traiter l'image
      await sharp(buffer)
        .webp({ quality: 20 })
        .toFile("./images/" + ref);

      req.file.filename = ref;

      // Appelez le callback avec `null` pour l'erreur et l'objet de réponse JSON
      next();
  });
};

// Exportez la fonction sharpImage pour l'utiliser dans d'autres fichiers
module.exports = sharpImage;