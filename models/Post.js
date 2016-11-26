"use strict";

const Model = require('objection').Model;

class Subscriber extends Model {
    static get tableName() {
        return "subscriber";
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'type',
                'value'
            ],

            properties: {
                id: { type: 'integer' },
                type: { type: 'string' },
                value: { type: 'string' }
            }
        };
    }


}
