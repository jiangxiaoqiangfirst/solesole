; define(function () {
    "use strict";
    class page {
        constructor() {
            this.config = {
                elemId: '#page',
                pageIndex: '1',
                total: '0',
                pageNum: '7',
                pageSize: '10'
            };
        }
        initMathod(obj) {//使用方式改变
            $.extend(this.config, obj.params);//将定义设置信息给this.config对象
            // this.requestFunction = null;//清除上次的内容
            this.requestFunction = obj.requestFunction;
            this.renderPage();
        };
        renderPage() {
            let _this =this;
            this.requestFunction();//在执行函数
            this.pageHtml();//在执行函数

            $(this.config.elemId).on('click', 'a', function () {
                //点击事件利用事件委托来
                var flag = $(this).parent().hasClass('disabled');
                if (flag) {
                    return false;
                }
                let pageIndex = $(this).data('pageindex');
                _this.config.pageIndex = pageIndex;
                _this.requestFunction();
                _this.pageHtml();
            });
        };
        pageHtml() {
            let data = this.config;
            if (parseInt(data.total) <= 0) {
                return false;
            }
            var elemId = data.elemId;
            var pageNum = this.isBlank(data.pageNum) ? 7 : parseInt(data.pageNum);
            // console.log(pageNum);
            var pageSize = this.isBlank(data.pageSize) ? 10 : parseInt(data.pageSize);
            var total = parseInt(data.total);
            var pageTotal = total % pageSize != 0 ? parseInt(total / pageSize) + 1 : parseInt(total / pageSize);
            var pageIndex = pageTotal < parseInt(data.pageIndex) ? pageTotal : parseInt(data.pageIndex);
            var j = pageTotal < pageNum ? pageTotal : pageNum;
            var k = pageIndex < parseInt((j / 2) + 1) ? -1 * (pageIndex - 1) : pageIndex > (pageTotal - parseInt(j / 2)) ? -1 * (j - (pageTotal - pageIndex) - 1) : -1 * parseInt((j / 2));
            var pageHtml = '<ul>';
            if (pageIndex <= 0 || pageIndex == 1) {
                pageHtml += '<li class="disabled"><a href="javascript:;" data-pageindex="' + pageIndex + '">首页</a></li>' +
                    '<li class="disabled"><a href="javascript:;" data-pageindex="' + pageIndex + '">上一页</a></li>';
            } else {
                pageHtml += '<li><a href="javascript:;" data-pageindex="1">首页</a></li>' +
                    '<li><a href="javascript:;" data-pageindex="' + (pageIndex - 1) + '">上一页</a></li>';
            }
            for (var i = k; i < (k + j); i++) {
                if (pageTotal == (pageIndex + i - 1)) break; if (i == 0) {
                    pageHtml += '<li class="active"><a href="javascript:;" data-pageindex="' + pageIndex + '">' + pageIndex + '</a></li>';
                } else {
                    pageHtml += '<li><a href="javascript:;" data-pageindex="' + (pageIndex + i) + '">' + (pageIndex + i) + '</a></li>';
                }
            }
            if (pageTotal == 1 || pageTotal <= pageIndex) {
                pageHtml += '<li class="disabled"><a href="javascript:;" data-pageindex="' + pageTotal + '">下一页</a></li>' +
                    '<li class="disabled"><a href="javascript:;" data-pageindex="' + pageTotal + '">末页</a></li>';
            } else {
                pageHtml += '<li><a href="javascript:;" data-pageindex="' + (pageIndex + 1) + '">下一页</a></li>' +
                    '<li><a href="javascript:;" data-pageindex="' + pageTotal + '">末页</a></li>';
            }
            pageHtml += '</ul>'
            $(elemId).html('');
            $(elemId).html(pageHtml);
        };
        isBlank(str) {
            if (str == undefined || str == null || str.trim() == '') {
                return true;
            }
            return false;
        }
    }
    return {
        page: page
    }
});


// page.config = {
//     elemId: '#page',
//     pageIndex: '1',
//     total: '0',
//     pageNum: '7',
//     pageSize: '10'
// }
//elemId 分页容器，具体参照源码
//pageIndex 当前页,一般不做配置，默认为1
//total 总记录数，默认为0条，通过ajax获取到的总记录数更新值
//pageNum 分页页码显示个数，默认7个
//pageSize 列表显示记录数，默认10条

// page.initMathod({
//     params: {
//         elemId: '#Page',
//         total: '123'
//     },
//     requestFunction: function () {
//         // P.config.total = parseInt(Math.random() * 10 + 85);//此处模拟总记录变化
//         //TODO ajax异步请求过程,异步获取到的数据总条数赋值给 P.config.total
//         //列表渲染自行处理
//         console.log(JSON.stringify(P.config));
//     }
// });