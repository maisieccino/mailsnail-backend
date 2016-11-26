
exports.up = function(knex, Promise) {
    return knex.schema.table('post', function (table) {
        table.bigInteger('letterbox').unsigned().notNullable().references('id').inTable('letterbox');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('post', function (table) {
        table.dropColumn('letterbox');
    });
};
