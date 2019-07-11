//jquery banner图插件
; (function () {
    "use strict";
    //jquery合并的方法;
    //$.banner = function(){};
    //$.fn.banner = function(){};
    //$.extend({banner:function(){}});
    //$.fn.extend({banner:function(){}});
    //$.extend($,{banner:function(){}});
    //$.extend($.fn,{banner:function(){}});
    //允许出入参数，描写banner图的活动小图标的样式css
    // 格式为

    $.fn.banner = function (options) {
        var { list, listStyles, items, left, right, autoPlay, delayTime, moveTime, index } = options;

        list = list === false ? false : true;
        autoPlay = autoPlay === false ? false : true;
        delayTime = delayTime || 2000;
        moveTime = moveTime || 200;
        index = index || 0;
        let iPrev = items.length - 1;
        if (index != 0) index--;

        // 处理listStyles参数
        this.p = {
            width: 113,
            height: 38,
            background: "transparent",
            position: "absolute",
            bottom: 0,
            right: 12,
            listStyle: "none",
            padding: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        };
        this.l = {
            width: 20,
            height: 20,
            lineHeight: "20px",
            color: "#000",
            background: "#e6e1e5",
            textAlign: "center"
        };
        this.a = {
            background: "#dd8344",
            color: "#fff"
        };

        //测试使用
        if (listStyles) {
            if (listStyles.parent) {
                for (let i in listStyles.parent) {
                    this.p[i] = listStyles.parent[i];
                }
            }
            if (listStyles.children) {
                for (let i in listStyles.children) {
                    this.l[i] = listStyles.children[i];
                }
            }
            if (listStyles.active) {
                for (let i in listStyles.active) {
                    this.a[i] = listStyles.active[i];
                }
            }
        }

        $(this).find(".imgbox").children().eq(index).css({
            left: 0
        })

        let move = function (direct, iPrev_, iNow_) {
            let iNow;
            iPrev = iPrev_ !== undefined ? iPrev_ : iPrev;
            iNow = iNow_ !== undefined ? iNow_ : index;

            items.eq(iPrev).css({
                left: 0
            }).stop().animate({
                left: -items.eq(0).width() * direct
            }, moveTime).end().eq(iNow).css({
                left: items.eq(0).width() * direct
            }).stop().animate({
                left: 0
            }, moveTime)
            //选中对应的list,不要全选；
            $(this).children(".list").children().eq(iPrev).css(this.l).end().eq(iNow).css(this.a)
        }.bind(this)

        function leftEvent() {
            if (index == 0) {
                index = items.length - 1;
                iPrev = 0;
            } else {
                index--;
                iPrev = index + 1;
            }
            move(1)
        }

        function rightEvent() {
            if (index == items.length - 1) {
                index = 0;
                iPrev = items.length - 1;
            } else {
                index++;
                iPrev = index - 1;
            }
            move(-1)
        }
        //左右按钮
        if (left != undefined && left.length > 0 && right != undefined && right.length > 0) {
            left.click(leftEvent)
            right.click(rightEvent)
        }

        if (list) {
            var str = "";
            for (var i = 0; i < items.length; i++) {
                str += `<li>${i + 1}</li>`;
            }
            this.append($("<ul class = 'list'>").html(str));
            // .....渲染时要选中部分的list，不要全选

            $(this).children(".list").css(this.p).children().css(this.l).eq(index).css(this.a);

            // ......console.log.

            //list的功能
            $(this).find(".list").children("li").click(function () {
                if ($(this).index() > index) {
                    move(1, index, $(this).index())
                }
                if ($(this).index() < index) {
                    move(-1, index, $(this).index())
                }
                index = $(this).index();
            })
        }
        if (autoPlay) {
            let timer;
            timer = setInterval(() => {
                leftEvent()
            }, delayTime);

            this.hover(function () {
                clearInterval(timer);
            }, function () {
                timer = setInterval(() => {
                    leftEvent()
                }, delayTime);
            })
        }

    }
})(jQuery);