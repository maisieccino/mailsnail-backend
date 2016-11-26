
exports.up = function(knex, Promise) {
    return knex.schema.table('letterbox', function (table) {
        table.bigInteger('building').unsigned().notNullable().references('id').inTable('building');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('letterbox', function (table) {
        table.dropColumn('building');
    });
};
