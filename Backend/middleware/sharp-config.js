const sharp = require('sharp');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const sharpImage = (req, res, next) => {
  upload.single("image")(req, res, async (error) => {
      const { buffer, originalname } = req.file;
      const timestamp = Date.now();
      const ref = originalname + '.' + timestamp + '.webp';

      await sharp(buffer)
        .webp({ quality: 20 })
        .toFile("./images/" + ref);

      req.file.filename = ref;

      next();
  });
};

module.exports = sharpImage;