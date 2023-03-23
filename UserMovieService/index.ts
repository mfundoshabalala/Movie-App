import http from 'http';

import app from './app';

const server = http.createServer(app);

const route = require('./app');

const port = process.env.PORT || 3550;

server.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});