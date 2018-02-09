exports.up = function(knex, Promise) {
  return knex.schema.createTable("articles", function(table) {
    table.increments();
    table.string("title").notNullable();
    table.string("body").notNullable();
    table.string("author").notNullable();
    table.string("url_title").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("articles");
};

//                  ARTICLES
//      -----------------------------------
//      | ID  | TITLE | BODY | AUTHOR | URL |
//      | NUM | STR   | STR  | STR    | STR |
