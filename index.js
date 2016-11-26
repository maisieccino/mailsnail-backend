/* jshint esversion: 6 */
/*jshint node: true */

"use strict";

const _ = require('lodash');
const koa = require('koa');
const Knex = require('knex');
const morgan = require('morgan');
const knexConfig = require('./knexfile');
const Model = require('objection').Model;

const xml = require('xml');

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
            if (this.path.match(/^\/api/)) {
                switch(this.accepts(['json','xml','html'])) {
                    case 'json':
                        this.body = JSON.stringify({response: this.body, status: this.status}, '\t', 2);
                        break;
                    case 'xml':
                        this.body = "<response>" + xml(this.body) + "</response>";
                        break;
                    case 'html': break;
                    default:
                        this.throw(406, 'Not accepted');
                }
            }
        }
        catch (e) {
        }
    }
    catch (e) {
        this.status = e.status || 500;
        this.body = e.message || '{ error: "Internal server error" }';
    }

    console.log (this.method + ' ' + this.path + ' - ' + this.status);
});

require('./api')(app);

app.listen(process.env.PORT || 3000);
