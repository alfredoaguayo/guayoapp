const express = require('express');  // OK
const router = express.Router();                // OK
//const path = require('path');           

//const Image = require('../models/image');


router.get('/', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
});

// router.get('/upload', (req, res) => {   // OK
//     res.render('upload');
// });

// router.post('/upload', async (req, res) => {  // Ok
//     const image = new Image();
//     image.title = req.body.title;
//     image.description = req.body.description;
//     image.filename = req.file.filename;
//     image.path = '/img/uploads/' + req.file.filename;
//     image.originalname = req.file. originalname;
//     image.mimetype = req.file.mimetype; 
//     image.size = req.file.size; 

//     await image.save();

//     res.redirect('/');
// });

// router.get('/image/:id', (req, res) => {
//     res.send('Profile iMAGE');
// });

// router.get('/image/:id/delete', (req, res) => {
//     res.send('Image deleted');
// });

module.exports = router;                // OK