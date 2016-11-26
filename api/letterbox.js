/* jshint esversion: 6 */
/* jshint node: true */
"use strict";

const Router = require('koa-router');

const Letterbox = require('../models/Letterbox');

module.exports = function(api) {
    var router = new Router({
        prefix: '/letterbox'
    });

    router.post('/new', function *() {
        const letterbox = yield Letterbox
            .query()
            .insertAndFetch(this.request.body);

        this.body = {"message": "success"};
    });

    router.get('/count', function *() {
        var serial_no = this.query.serial_no;
        if (serial_no) {
            const letterbox = yield Letterbox
                .query()
                .where("serial_no","=",serial_no)
                .first();

            const count = yield letterbox
                .$relatedQuery('post')
                .count();

            this.body = count[0];
        }
        else {
            this.throw(401, "No serial number provided");
        }
    });

    api.use(router.routes());
    api.use(router.allowedMethods());
}
