/* jshint esversion: 6 */
/* jshint node: true */
"use strict";

const Router = require('koa-router');

const User = require('../models/User');

module.exports = function(app) {
    var router = new Router({
        prefix: '/api/user'
    });

    router.post('/new', function() {
        this.req.body.password = User.hashPassword(this.req.body.password);
        console.log(this.req.body.password);
        
    });

    app.use(router.routes());
    app.use(router.allowedMethods());
}
