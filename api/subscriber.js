"use strict";

const Router = require('koa-router');

//TODO: Add models

module.exports = function (app) {
    var router = new Router({
        prefix: '/api/subscriber'
    });

    router.post('/new', function () {
        this.body = "received"
    });

    app.use(router.routes());
    app.use(router.allowedMethods());
}
