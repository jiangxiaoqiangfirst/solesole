;(() => {
    "use strict";
    // 加载模块

    require.config({
        //查找小模块的基目录
        baseUrl: "../module",
        // 给小模块的路径
        paths: {
            jquery: "../libs/jquery2.2.4",
            onScroll: "lazyload",
            pa: "page",
            cookie: "jquery.cookie",
            cookieadd: "cookieadd"
            // HoverEvent: "hoverEvent"
        }
    });

    // 引入模块
    require(["jquery", "onScroll", "pa", "cookie", "cookieadd"], function (_, onScroll, a, cookie, cookieadd) {
        let page = new a.page();
        // page.config={
        //     elemId: '#page',
        //     pageIndex: '1',
        //     total: '0',
        //     pageNum: '7',
        //     pageSize: '10'
        // }

        $.get("../json/data03.json", res => {
            new goods({
                res: res
            });
        });
        //渲染商品内容
        $.ajax({
            url: "../json/data01.json", success: res => {
                page.initMathod({
                    params: {
                        //页码显示的位置
                        elemId: '.cont-pagebottom',
                        //数据的长度
                        total: res.length,
                        //现实的页面
                        pageIndex: '1',
                        //最多页码显示的数量
                        pageNum: '7',
                        //每页的数据条数
                        pageSize: '20'
                    },
                    requestFunction: function () {
                        //列表渲染自行处理

                        new goodsgo({
                            res: res,
                            config: this.config
                        });
                        //给新渲染的页面内容执行懒加载
                        goLazyload('img[data-src], .back-url', "#main", onScroll.onScroll);
                    }
                });
            }
        });
        //事件委托,购物车部分
        new cookieadd.cookieadd();
    });
    //下拉点击事件
    let matcr_onoff = 1;
    $("#main").find(".matc-r").click(function () {
        // console.log(this);
        if (matcr_onoff) {
            matcr_onoff = 0;
            $(this).children().eq(1).css("backgroundPosition", "-490px 0").end().eq(0).html("收起").parent().parent().css("height", 114);
        } else {
            matcr_onoff = 1;
            $(this).children().eq(1).css("backgroundPosition", "-472px 0").end().eq(0).html("更多").parent().parent().css("height", 40);
        }
    });

    $("#main").find(".mtc2-4").hover(function () {
        $(this).children().eq(0).css({ "background": "#fff", "borderBottom": "1px solid #fff" }).children(".cont").eq(0).css({ "backgroundPosition": " -490px 4px" }).parent().next().stop().show();
    }, function () {
        $(this).children().eq(0).css({ "background": "transparent", "borderBottom": "0" }).children(".cont").eq(0).css({ "backgroundPosition": " -472px 4px" }).parent().next().stop().hide();
    });

    class goods {
        constructor(options) {
            this.res = options.res;
            this.init();
        }
        init() {
            let str = "";
            for (let i = 0; i < this.res.length; i++) {
                str += `<div class="hjzw-cc goods" goodsid=${this.res[i].ip}>
                        <a href="http://localhost:8282/html/shopping.html"><img src="../img/timg.gif" data-src="${this.res[i].src[0]}" alt="">
                            <p class="tip">${this.res[i].tip}</p><span class="price">${this.res[i].price}</span>
                        </a>
                    </div>`;
            }
            $("#main").find(".hjzw-cont").html(str);
        }
    }

    class goodsgo {
        constructor(options) {
            //浅拷贝,自读不修改，能时时监测数据的变化，不同变量名，其实是同一变量
            this.res = options.res;
            this.config = options.config;
            this.init();
        }
        init() {
            //分页的效果要做
            let str = "";
            // console.log(this.config.pageIndex, parseInt(this.config.pageSize));
            for (let i = (this.config.pageIndex - 1) * this.config.pageSize; i < (this.config.pageIndex - 1) * this.config.pageSize + parseInt(this.config.pageSize); i++) {
                if (i < this.res.length) {
                    str += `<div class="main-cont-llo goods" goodsid=${this.res[i].ip}>
                    <a href="http://localhost:8282/html/shopping.html"><img src="../img/timg.gif" data-src="${this.res[i].src[0]}" alt="">
                        <p class="price">${this.res[i].price}</p><span class="tip">${this.res[i].tip}</span>
                    </a>
                </div>`;
                }
            }
            $("#main").find(".cont-cont").html(str);
        }
    }

    //定义一个运行加载图片的函数的函数
    function goLazyload(ele, context, fn) {
        var lazyImgs = $.map($(ele, $(context)).get(), function (i) {
            return $(i);
        });
        // 看lazyImgs内容是不正确的，因为是浅拷贝，onScroll函数在删除数组内容，console.log(lazyImgs);
        // 绑定事件:
        $(window).scroll(fn.bind(null, lazyImgs));
        // 手动触发一次:
        fn(lazyImgs);
    }
})();