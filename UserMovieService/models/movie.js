const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
	movieId: { type: String, required: true, unique: true },
	movieName: { type: String, required: true, unique: true },
	yearReleased: { type: String, required: true },
});

module.exports = mongoose.model('Movie', movieSchema);