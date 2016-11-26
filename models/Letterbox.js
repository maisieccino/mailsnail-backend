"use strict";

const Model = require('objection').Model;

class Letterbox extends Model {
    static get tableName() {
        return "letterbox";
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'name'
            ],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                location: { type: 'string' }
            }
        };
    }


}
