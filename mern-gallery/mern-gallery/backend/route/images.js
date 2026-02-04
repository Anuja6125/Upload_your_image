const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const Image = require('../models/images');

// @route   POST api/images/upload
// @desc    Upload an image to Cloudinary and save URL to DB
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const newImage = new Image({
            imageUrl: req.file.path, // This is the Cloudinary URL
            publicId: req.file.filename,
            title: req.body.title
        });

        await newImage.save();
        res.json(newImage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// @route   GET api/images
// @desc    Get all images for common users
router.get('/', async (req, res) => {
    try {
        const images = await Image.find().sort({ uploadedAt: -1 });
        res.json(images);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;