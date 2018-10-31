'use strict';

var $ = require('jquery');
var mockjax = require('jquery-mockjax')($, window);

module.exports = {
    init: function() {
        mockjax({
            url: 'api/readData',
            responseTime: 0,
            response: function() {

            }
        });
    }
};
