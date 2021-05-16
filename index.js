'user strict';
require('dotenv').config();

const PORT = process.env.PORT;

const MONGODB_URI = process.env.MONGODB_URI;

let server = require('./src/server.js');

server.start(PORT, MONGODB_URI);