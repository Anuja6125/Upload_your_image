const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true }, // Needed if you want to delete images later
    title: { type: String },
    uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Image', ImageSchema);