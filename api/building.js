/* jshint esversion: 6 */
/* jshint node: true */
"use strict";

const Router = require('koa-router');

const Building = require('../models/Building');
const Letterbox = require('../models/Letterbox');

module.exports = function(api) {
    var router = new Router({
        prefix: '/building'
    });

    router.post('/new', function *() {
        const building= yield Building
            .query()
            .insertAndFetch(this.request.body);

        this.body = {"message": "success"};
    });

    router.post('/:id/letterbox/new', function *() {
        const building = yield Building
            .query()
            .findById(this.params.id);

        if (!building) {
            this.throw(404, "Building not found");
        }
    
        console.log(building);
        return yield building
            .$relatedQuery('letterbox')
            .insert(this.request.body);


    });

    api.use(router.routes());
    api.use(router.allowedMethods());
}
