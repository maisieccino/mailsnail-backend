/* jshint esversion: 6 */
/*jshint node: true */

"use strict";

const _ = require('lodash');
const koa = require('koa');
const Knex = require('knex');
const morgan = require('morgan');
const knexConfig = require('./knexfile');
const Model = require('objection').Model;

// Initialize knex.
const knex = Knex(knexConfig.development);

// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex method.
Model.knex(knex);
const app = koa();

app.use(require('koa-bodyparser')({
    strict: true
}));

app.use(function* (next) {
    try {
        yield next;
        try {
            // JSONify api calls.
            if (this.path.match(/^\/api/)) {
                this.body = JSON.stringify(this.body, '\t', 2);
            }
        }
        catch (e) {
        }
    }
    catch (e) {
        this.status = e.status || 500;
        this.body = e.message || '{ error: "Internal server error" }';
    }
});

require('./api')(app);

app.listen(process.env.PORT || 3000);
