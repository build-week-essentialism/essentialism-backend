exports.up = function(knex) {
  return knex.schema.createTable('user-values', table => {
    table.increments();
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      // If a user account is deleted, all junction records related to that user_id will be deleted
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .integer('default_value_id')
      .unsigned()
      .references('id')
      .inTable('default-values')
      // There should be no way to delete or update a default value
      .onDelete('RESTRICT')
      .onUpdate('RESTRICT');
    table
      .integer('created_value_id')
      .unsigned()
      .references('id')
      .inTable('created-values')
      // If a created value is deleted, this junction record will be deleted
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.integer('value_rank');
    table.string('value_importance', 256);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user-values');
};
