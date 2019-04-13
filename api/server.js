const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

const authRouter = require('../routers/authRouter');
const valuesRouter = require('../routers/valuesRouter');
const projectsRouter = require('../routers/projectsRouter');

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/values', valuesRouter);
server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
  res.send('Server running...');
});

module.exports = server;
