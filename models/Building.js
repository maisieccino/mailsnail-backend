"use strict";

const Model = require('objection').Model;

const User = require('./User');
const Letterbox = require('./Letterbox');

class Building extends Model {
    static get tableName() {
        return "building";
    }

    static get idColumn() {
        return "id";
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

    static get relationMappings() {
        return {
            letterbox: {
                relation: Model.HasManyRelation,
                modelClass: Letterbox,
                join: {
                    from: 'building.id',
                    to: 'letterbox.building'
                }
            }
        };
    }
}

module.exports = Building;
