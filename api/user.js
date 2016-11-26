/* jshint esversion: 6 */
/* jshint node: true */
"use strict";

const Router = require('koa-router');

const User = require('../models/User');

module.exports = function(app) {
    var router = new Router({
        prefix: '/api/user'
    });

    router.get('/', function () {
        this.body = "yolo";
    });

    app.use(router.routes());
    app.use(router.allowedMethods());
}
