"use strict";

const Model = require('objection').Model;

class Letterbox extends Model {
    static get tableName() {
        return "letterbox";
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'name',
                'serial_no'
            ],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                location: { type: 'string' },
                serial_no: { type: 'string' },
                building: { type: 'integer'}
            }
        };
    }

    static get relationMappings() {
        return {
            post: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Post',
                join: {
                    from: 'letterbox.id',
                    to: 'post.letterbox'
                }
            },

            building: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/Building',
                join: {
                    from: 'letterbox.building',
                    to: 'building.id'
                }
            }
        };
    }

}

module.exports = Letterbox;
