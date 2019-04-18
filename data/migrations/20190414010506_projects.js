exports.up = function(knex) {
  return knex.schema.createTable('projects', table => {
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
    table.string('project_name', 64).notNullable();
    table
      .boolean('project_active')
      .notNullable()
      .defaultTo(true);
    table
      .integer('proj_val_align')
      .notNullable()
      .defaultTo(0);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('projects');
};
