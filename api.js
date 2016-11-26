/* jshint esversion: 6 */
/* jshint node: true */

const Router = require('koa-router');

module.exports = function(app) {
    //TODO: include api endpoints.

    var api = new Router({
        prefix: '/api'
    });


    require('./api/user')(api);

    require('./api/building')(api);

    require('./api/subscriber')(api);

    require('./api/letterbox')(api);

    require('./api/post')(api);

    app.use(api.routes());
    app.use(api.allowedMethods())
}
