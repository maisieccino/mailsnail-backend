"use strict";

const Router = require('koa-router');

//TODO: Add models

module.exports = function (api) {
    var router = new Router({
        prefix: '/subscriber'
    });

    router.post('/new', function () {
        this.body = "received"
    });

    api.use(router.routes());
    api.use(router.allowedMethods());
}
