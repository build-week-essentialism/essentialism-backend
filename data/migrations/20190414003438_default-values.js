exports.up = function(knex) {
  return knex.schema.createTable('default-values', table => {
    table.increments();
    table
      .string('default_value_name', 64)
      .notNullable()
      .unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('default-values');
};
