"use strict";

const Model = require('objection').Model;
const Letterbox = require('./Letterbox');

class Post extends Model {
    static get tableName() {
        return "post";
    }

    static get idColumn() {
        return 'id';
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
                value: { type: 'string' },
                letterbox: { type: 'integer' }
            }
        };
    }

    static get relationMappings() {
        return {
            letterbox: {
                relation: Model.BelongsToOneRelation,
                modelClass: Letterbox,
                join: {
                    from: 'post.letterbox',
                    to: 'letterbox.id'
                }
            }
        };
    }

}

module.exports = Post;
