const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	// watchList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
	watchList: { type: Array, default: [] },
});

module.exports = mongoose.model('User', userSchema);