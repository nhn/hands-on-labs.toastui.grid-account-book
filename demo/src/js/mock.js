'use strict';

var $ = require('jquery');
var mockjax = require('jquery-mockjax')($, window);

module.exports = {
    init: function() {
        mockjax({
            url: 'api/readData',
            responseTime: 0,
            response: function() {
                var responseData = {
                    result: true,
                    data: {
                        // 그리드 데이터 설정 시 사용되는 data 값에 해당됩니다.
                        contents: [
                            {
                                date: '2018-09-01',
                                category1: '1',
                                category2: '웨일즈마켓',
                                payment: '4',
                                amount: '5000'
                            }
                        ]
                    }
                };

                this.responseText = JSON.stringify(responseData);
            }
        });

        mockjax({
            url: 'api/createData',
            responseTime: 0,
            response: function() {
                var responseData = {
                    result: true, // 필수
                    data: {}, // 필수
                    modified: 'create' // 선택
                };

                this.responseText = JSON.stringify(responseData);
            }
        });

        mockjax({ // 수정 응답 데이터
            url: 'api/updateData',
            responseTime: 0,
            response: function() {
                var responseData = {
                    result: true,
                    data: {},
                    modified: 'update'
                };

                this.responseText = JSON.stringify(responseData);
            }
        });

        mockjax({ // 삭제 응답 데이터
            url: 'api/deleteData',
            responseTime: 0,
            response: function() {
                var responseData = {
                  result: true,
                  data: {},
                  modified: 'delete'
                };

                this.responseText = JSON.stringify(responseData);
            }
        });
    }
};
