require('dotenv').config();
require('./configs/database').connect();


import express, { Express, Request, Response } from 'express';
const jwt = require('jsonwebtoken');

const app: Express = express();

app.use(express.json());

const { JWT_SECRET } = process.env;

const User = require('./models/user');
const Movie = require('./models/movie');
// const { log } = require('console');

app.get('/', async (req: Request, res: Response) => {
	res.send('Express + TypeScript Server');
});

app.post('/movie', async (req: Request, res: Response) => {
	try {
		const { movieId, movieName, yearReleased } = req.body;
		if (!(movieId && movieName && yearReleased)) {
			res.status(400).send('All input is required');
		}

		const existingMovie = await Movie.findOne({ movieId });
		if (existingMovie) {
			return res.status(409).send('Movie already exists');
		}

		const movie = new Movie({
			movieId,
			movieName,
			yearReleased,
		});

		await movie.save();
		res.status(201).send(movie);
	} catch (error) {
		console.log(error);
	}
});

app.route('/movies').get(async (req, res) => {
	try {
		const movies = await Movie.find();
		res.status(200).send(movies);
	} catch (error) {
		console.log(error);
	}
});

app.post('/user', async (req, res) => {
	try {
		const { email, username, password, watchList } = req.body;
		if (!(email && username && password)) {
			res.status(400).send('All input is required');
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).send('User already exists');
		}

		const user = new User({
			email,
			username,
			password,
			watchList,
		});

		await user.save();

		let data = {
			time: new Date(),
			userId: user._id,
		}

		const token = jwt.sign(data, String(JWT_SECRET), { expiresIn: '1h' });
		// @ts-ignore
		user.token = token;
		res.status(201).send(user);
	} catch (error) {
		console.log(error);
	}
});

app.route('/users').get(async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).send(users);
	} catch (error) {
		console.log(error);
	}
});

export default app;