
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('user', function (table) {
            table.bigIncrements('id').unsigned().primary();
            table.string('name').notNullable();
            table.string('email').notNullable().unique();
            table.string('password_digest').notNullable();
        }),

        knex.schema.createTable('building', function (table) {
            table.bigIncrements('id').unsigned().primary();
            table.string('address').notNullable();
        }),

        knex.schema.createTable('user_building', function (table) {
            table.bigInteger('user').unsigned().notNullable();
            table.bigInteger('building').unsigned().notNullable();
            table.index(['user', 'building'], 'user_building_index');
        }),

        knex.schema.createTable('letterbox', function (table) {
            table.bigIncrements('id').unsigned().primary();
            table.string('name').notNullable();
            table.string('location');
        }),

        knex.schema.createTable('subscriber', function (table) {
            table.bigIncrements('id').unsigned().primary();
            table.string('type').notNullable();
            table.string('value').notNullable();
        }),

        knex.schema.createTable('letterbox_subscriber', function (table) {
            table.bigInteger('letterbox').unsigned().notNullable();
            table.bigInteger('subscriber').unsigned().notNullable();
            table.index(['letterbox', 'subscriber'], 'letterbox_subscriber_index');
        }),

        knex.schema.createTable('post', function (table) {
            table.bigIncrements('id').unsigned().primary();
            table.string('content');
            table.bigInteger('for_user').unsigned().references('id').inTable('user');
            table.boolean('is_spam').default(false);
        })
    ]);
};

exports.down = function(knex, Promise) {
    var commands = [];
    for (var t of ['admin_user','org_user','ticket','ticket_tier','event_event_category','event_category','event','venue','organisation','user']) {
        commands.push(knex.schema.dropTable(t));
    }

    return Promise.all(commands);
};
