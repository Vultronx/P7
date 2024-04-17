const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const multerSharp = require('../middleware/sharp-config');

const bookCtrl = require('../controllers/book');

router.get('/', bookCtrl.getAllBook);
router.get("/bestrating", bookCtrl.getBestRating);
router.post('/', auth, multerSharp, bookCtrl.createBook);
router.get('/:id', bookCtrl.getOneBook);
router.put('/:id', auth, multerSharp, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.post("/:id/rating", auth, bookCtrl.createRating);

module.exports = router;