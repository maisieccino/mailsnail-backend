
exports.up = function(knex, Promise) {
    return knex.schema.table('post', function (table) {
        table.string('img_url');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('post', function (table) {
        table.dropColumn('img_url');
    })
};
