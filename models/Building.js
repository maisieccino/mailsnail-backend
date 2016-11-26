"use strict";

const Model = require('objection').Model;

class Building extends Model {
    static get tableName() {
        return "building";
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'address'
            ],

            properties: {
                id: { type: 'integer' },
                address: { type: 'string' },
            }
        };
    }


}
