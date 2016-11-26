
exports.up = function(knex, Promise) {
    return knex.schema.table('letterbox', function (table) {
        table.string('serial_no').notNullable().unique();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('letterbox', function (table) {
        table.dropColumn('serial_no');
    });
};
