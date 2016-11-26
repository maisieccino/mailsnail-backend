/* jshint esversion: 6 */
/* jshint node: true */
"use strict";

const Router = require('koa-router');

const Letterbox = require('../models/Letterbox');
const Post = require('../models/Post');

module.exports = function(api) {
    var router = new Router({
        prefix: '/post'
    });

    router.post('/new', function *() {
        if (!this.request.body.serial_no) {
            this.throw(401, "No letterbox id provided");
        }
        else {
            const letterbox = yield Letterbox
                .query()
                .where("serial_no", "=", this.request.body.serial_no)
                .first();

            if (!letterbox) {
                this.throw(404, "No letterbox found with that serial number");
            }
    
            this.body = yield letterbox
                .$relatedQuery('post')
                .insert({
                    content: this.request.body.content,
                });
            
        }
    });

    api.use(router.routes());
    api.use(router.allowedMethods());
}
