exports.up = (knex) =>
  knex.schema.createTable("movie_notes", (table) => {
    table.increments("id").primary();
    table.string("title", 255);
    table.string("description", 1500);
    table.integer("rating");
    table.integer("user_id").references("id").inTable("users");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });
  
exports.down = (knex) => knex.schema.dropTable("movie_notes");
