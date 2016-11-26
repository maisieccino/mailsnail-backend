/* jshint esversion: 6 */
/* jshint node: true */

module.exports = function(app) {
    //TODO: include api endpoints.

    require('./api/user')(app);
}
