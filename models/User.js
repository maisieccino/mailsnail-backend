"use strict";

const Model = require('objection').Model;

const bcrypt = require('bcrypt-nodejs');

class User extends Model {
    static get tableName() {
        return "user";
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'name',
                'email',
                'password_digest'
            ],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                email: { type: 'string' },
                password_digest: { type: 'string' }
            }
        };
    }

    static get relationMappings() {
        return {
            building: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Building',
                join: {
                    from: 'user.id',
                    through: {
                        from: 'user_building.user',
                        to: 'user_building.building'
                    },
                    to: 'building.id'
                }
            }
        };
    }

    static hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    }
}

module.exports = User;
