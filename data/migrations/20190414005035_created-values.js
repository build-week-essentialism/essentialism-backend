exports.up = function(knex) {
  return knex.schema.createTable('created-values', table => {
    table.increments();
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      // If a user account is deleted, their created values will be deleted:
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.string('created_value_name', 64).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('created-values');
};
