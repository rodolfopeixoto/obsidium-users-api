require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const bodyParser = require('body-parser');

const server = express();


server.use(cors({}));
server.use(express.json());
server.use(routes);
server.use(bodyParser.json());

server.listen(3003);