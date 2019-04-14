const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

// const authRouter = require('../routers/authRouter');
// const createdValuesRouter = require('../routers/createdValuesRouter');
// const projectsRouter = require('../routers/projectsRouter');
// const userValuesRouter = require('../routers/userValuesRouter');

server.use(helmet());
server.use(express.json());
server.use(cors());

// server.use('/api/auth', authRouter);
// server.use('/api/createdvalues', createdValuesRouter);
// server.use('/api/projects', projectsRouter);
// server.use('/api/uservalues', userValuesRouter);

server.get('/', (req, res) => {
  res.send('Server running...');
});

module.exports = server;
