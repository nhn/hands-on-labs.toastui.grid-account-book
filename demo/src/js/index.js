'use strict';

var mock = require('./mock');
var Grid = require('tui-grid');
var options = {
    el: document.getElementById('grid'),
    rowHeaders: [
        'radio',
        'rowNum'
    ],
    summary: {
        height: 40,
        position: 'bottom',
        columnContent: {
            amount: {
                template: function(valueMap) {
                    return '합계 : ' + valueMap.sum;
                }
            }
        }
    },
    columns: [
        {
            title: '날짜',
            name: 'date',
            editOptions: {
                type: 'text'
            },
            component: {
                name: 'datePicker',
                options: {
                    format: 'yyyy-MM-dd'
                }
            }
        },
        {
            title: '내역',
            name: 'category1',
            onAfterChange: function() {
                net = grid.getAddOn('Net');
                net.request('updateData');
            },
            editOptions: {
                type: 'select',
                listItems: [
                    {
                        text: '선택 안함',
                        value: '0'
                    },
                    {
                        text: '식비',
                        value: '1'
                    },
                    {
                        text: '문화 생활비',
                        value: '2'
                    },
                    {
                        text: '교통비',
                        value: '3'
                    },
                    {
                        text: '관리비',
                        value: '4'
                    }
                ]
            }
        },
        {
            title: '비고',
            name: 'category2',
            editOptions: {
                type: 'text'
            }
        },
        {
            title: '결제 방식',
            name: 'payment',
            editOptions: {
                useViewMode: false,
                type: 'checkbox',
                listItems: [
                    {
                        text: '현금',
                        value: '1'
                    },
                    {
                        text: '체크카드',
                        value: '2'
                    },
                    {
                        text: '신용카드',
                        value: '3'
                    },
                    {
                        text: '페이코',
                        value: '4'
                    }
                ]
            }
        },
        {
            title: '금액',
            name: 'amount',
            editOptions: {
                type: 'text'
            }
        }
    ],
    data: []
};

var grid = new Grid(options);
var net;

var rowData = [
    {
        date: '2018-09-01',
        category1: '1',
        category2: '웨일즈마켓',
        payment: '4',
        amount: '5000'
    }
];

function addRow() {
    grid.appendRow([
        {
          date: '',
          category1: '',
          category2: '',
          payment: '',
          amount: ''
        }
    ]);

    net = grid.getAddOn('Net');

    net.request('createData', {
        checkedOnly: false
    });
}

// 체크된 행 삭제
function removeRow() {
    var rowKeys = grid.getCheckedRowKeys();

    if (rowKeys.length) {
        grid.removeRow(rowKeys[0]);
    }

    net = grid.getAddOn('Net');
    net.request('deleteData');
}

document.getElementById('add').addEventListener('click', addRow);
document.getElementById('remove').addEventListener('click', removeRow);

// instance.appendRow(rowData);

mock.init();

grid.use('Net', {
    api: { // 호출할 서버 API의 url을 설정합니다.
        readData: 'api/readData',
        createData: 'api/createData',
        updateData: 'api/updateData', // 수정
        deleteData: 'api/deleteData' // 삭제
    },
    readDataMethod: 'GET' // API 호출에 대해 get 또는 post 방식을 사용할지 결정합니다.
});

//
// grid.on('response', function(response) {
//     var result = response.responseData;
//
//     console.log('modified: ', result.modified);
//     console.log('data: ', result.data);
// });

grid.on('response', function(response) {
    var responseData = response.responseData;

    if (responseData.result && responseData.modified) {
      alert(responseData.modified + ' 되었습니다.');
    }
});
