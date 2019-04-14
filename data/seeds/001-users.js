const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  return knex('users').insert([
    {
      username: 'billie',
      password: bcrypt.hashSync('123', 8),
      created_at: knex.fn.now(),
      email: 'billieeilish@gmail.com',
      firstName: 'Billie',
      lastName: 'Eilish'
    },
    {
      username: 'christian',
      password: bcrypt.hashSync('456', 8),
      created_at: knex.fn.now(),
      email: 'christianfennesz@gmail.com',
      firstName: 'Christian',
      lastName: 'Fennesz'
    },
    {
      username: 'john',
      password: bcrypt.hashSync('789', 8),
      created_at: knex.fn.now(),
      email: 'johnmaus@gmail.com',
      firstName: 'John',
      lastName: 'Maus'
    }
  ]);
};
