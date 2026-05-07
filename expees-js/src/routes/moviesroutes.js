


const express = require('express');
const multer = require('multer');
const controller = require('../controllers/movie.controller');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('video'), controller.uploadMovie);

module.exports = router;