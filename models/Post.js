"use strict";

const Model = require('objection').Model;

class Post extends Model {
    static get tableName() {
        return "post";
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'content'
            ],

            properties: {
                id: { type: 'integer' },
                type: { type: 'string' },
                value: { type: 'string' }
            }
        };
    }


}
