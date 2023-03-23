import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	watchList: { type: Array, default: [] },
});

module.exports = mongoose.model('User', userSchema);