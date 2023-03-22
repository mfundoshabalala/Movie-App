const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

exports.connect = () => {
	mongoose.connect(String(MONGO_URI), {
	}).then(() => {
		console.log('Successfully connected to movie database.');
	}).catch((error) => {
		console.log('Could not connect to movie database. Exiting now...', error);
		process.exit(1);
	});
};