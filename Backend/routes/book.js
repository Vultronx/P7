const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const multerSharp = require('../middleware/sharp-config');

const bookCtrl = require('../controllers/book');

router.get('/', bookCtrl.getAllBook);
//router.post('/', auth, uploadImage, compressImage, bookCtrl.createBook); //multer
router.post('/', auth, multerSharp, bookCtrl.createBook); //multer
router.get('/:id', bookCtrl.getOneBook);
router.put('/:id', auth, multer, bookCtrl.modifyBook); //multer
router.delete('/:id', auth, bookCtrl.deleteBook);
//router.post("/:id/rating", bookCtrl.createRating);
//router.get("/bestrating", bookCtrl.getBestRating);

module.exports = router;