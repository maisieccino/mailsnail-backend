/* jshint esversion: 6 */
/* jshint node: true */
"use strict";

const Router = require('koa-router');

const User = require('../models/User');

module.exports = function(api) {
    var router = new Router({
        prefix: '/user'
    });

    router.post('/new', function *() {
        this.request.body.password_digest = User.hashPassword(this.request.body.password);
        
        const user = yield User
            .query()
            .insertAndFetch(this.request.body);

        this.status = 200;
    });

    api.use(router.routes());
    api.use(router.allowedMethods());
}
