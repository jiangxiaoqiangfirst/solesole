; (() => {
    "use strict";
    // 加载模块
    require.config({
        //查找小模块的基目录
        baseUrl: "../../module",
        // 给小模块的路径
        paths: {
            jquery: "../libs/jquery2.2.4",
            onScroll: "lazyload",
            cookie: "jquery.cookie"
            // HoverEvent: "hoverEvent"
        }
    })

    // 引入模块
    require(["jquery", "onScroll", "cookie"], function (_, onScroll, cookie) {
        // 先要加载页面元素，使用$(document).ready(function(){});
        // 下面使用了ready的简写方式
        var onScroll = onScroll.onScroll;
        $(() => {
            $("#header").load("../common/common.html .header", () => {
                //要在此处才能拿到元素
                //获取图片元素和背景图元素
                new landon;
                goLazyload('img[data-src], .back-url', "#header", onScroll);
            });

            $("#nav").load("../common/common.html .nav", () => {
                goLazyload('img[data-src], .back-url', "#nav", onScroll);
            });

            $("#footer").load("../common/common.html .footer", () => {
                goLazyload('img[data-src], .back-url', "body", onScroll);
                for (var i = 0; i < $(".hotarea_t ul li").length; i++) {
                    $(".hotarea_t ul li").eq(i).attr("index", i);
                }
                for (var i = 0; i < $(".firendlink-t dd").length; i++) {
                    $(".firendlink-t dd").eq(i).attr("index", i);
                }
            });

        });
    })

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
    //以下为头部header事件
    class landon {
        constructor() {
            this.someone = $.cookie("someone") == undefined ? 1 : JSON.parse($.cookie("someone"));
            this.land = $("#header").find(".land");
            this.land2 = $("#main").find(".main-r-c1");
            this.car = $("#header").find(".shop-b-cont");
            this.carnum = $("#header").find(".shop-num");
            this.shop = $.cookie("mycar") == undefined ? 1 : JSON.parse($.cookie("mycar"));
            this.getshuju();
            this.addEvent();
        }
        init() {
            console.log(this.someone, "init")
            if (this.someone == 1) {

                //没有登陆
                // 渲染页面
                let str = "";
                str = `<a href="../html/land.html" class="land-in">登陆</a>
                <a href="../html/land.html" class="land-out">免费注册</a>`;
                this.land.html(str);
                str = `<a class="" href="##">
                <i class='icon landin'></i> 登陆
            </a>
            <a href="##"><i class='icon landout'></i> 注册</a>`;
                this.land2.html(str);
                str = `<p>你没有可选商品，请前往下单</p>`;
                this.car.html(str);
                this.carnum.html("(0)");
            } else {
                //登陆上了
                let str = "";
                str = `<a href="##" class="myland-in">${this.someone.name}</a>
                <a href="##" class="myland-out">登出</a>`;
                this.land.html(str);
                str = "";
                str = `<a class="" href="##">
                <i class='icon landin'></i> ${this.someone.name}
            </a>
            <a href="##"><i class='icon landout'></i> 登出</a>`;
                this.land2.html(str);
                this.shopcar();
            }

        }
        getshuju() {
            let _this = this;
            $.ajax({
                url: "http://localhost:8282/json/data01.json",
                success: function (res) {
                    _this.res = res;
                    _this.init();

                }
            })
        }
        shopcar() {
            if (this.shop == 1) {
                let str = "";
                str = `<p>你没有可选商品，请前往下单</p>`;
                this.car.html(str);
                this.carnum.html(`(0)`);
            } else {
                let str = '';
                str = `<table border="1" cellspacing="0" width="240" align="center" class="tab"
                style="margin-top:20px;">
                <thead class="thd">
                    <tr>
                        <th width="100">商品</th>
                        <th>图片</th>
                    </tr>
                </thead>
                <tbody class="tbod" align="center">`;
                let some = [];
                for (let i = 0; i < this.shop.length; i++) {
                    this.res.some((v) => {
                        if (this.shop[i].id == v.ip) {
                            // if()if
                            if (some.length == 0) {
                                some.push(v)
                            } else {
                                for (let j = 0; j < some.length; j++) {
                                    if (v.ip !== some[j].ip) {
                                        some.push(v)
                                    }
                                }
                            }

                        }
                    })
                }
                // console.log(some);
                for (let i = 0; i < this.shop.length; i++) {
                    str += `<tr>
                        <td>商品</td>
                        <td height="40"><img src="${some[i].src[0]}" style="height:38px" alt=""></td>
                    </tr>`;
                }
                str += `</tbody>
                    </table>`;
                this.car.html(str);
                this.carnum.html(`(${this.shop.length})`);
            }

        }
        addEvent() {
            let _this = this;
            //退出页面
            $("#header").on("click", ".myland-out", function () {
                // console.log(this);
                console.log(88800);
                $.removeCookie("someone", { path: "/" });
                _this.someone = $.cookie("someone") == undefined ? 1 : JSON.parse($.cookie("someone"));
                _this.init();
            })

            //点击登陆
            $("#header").on("click", ".land-in", function () {
                console.log(999);
                $.cookie("status", '{"land":"1"}', { path: "/html" });
            })
            //点击注册
            $("#header").on("click", ".land-out", function () {
                console.log(888);
                $.cookie("status", '{"land":"0"}', { path: "/html" });
            })
        }

    }

    //给.head-top-top添加事件，用jquery的on方法，将事件委托给header,让其显示和隐藏
    $("#header").on("mouseover", ".head-top-top", function () {
        $(this).addClass("head-top-top-active").css("background", "#fff").children().eq(0).css("borderColor", "#666").end().eq(1).stop().show().css("zIndex", "9");
    });

    $("#header").on("mouseout", ".head-top-top", function () {
        $(this).removeClass("head-top-top-active").css("background", "transparent").children().eq(0).css("borderColor", "transparent").end().eq(1).stop().hide().css("zIndex", "-1");
    });
    //点击小事件委托不重要
    $("#header").on("click", ".head-cont-m", function () {
        $(this).addClass("active").siblings().removeClass("active");
    });
    //输入框事件
    $("#header").on("focus", "input[type='text']", function () {
        $(this).val("");
    });
    $("#header").on("blur", "input[type='text']", function () {
        $(this).val("请输入关键字");
    });

    //以下为连接nav事件
    $("#nav").on("mouseover", ".nav-ul .te", function () {
        $(".main-l-cont").css({
            "display": "block",
            zIndex: 99999
        });
    });

    $("#nav").on("mouseleave", ".nav-ul .te", function () {
        $(".main-l-cont").css("display", "none");
    });

    $("#nav").on("mouseover", ".main-l-cont li", function () {

        $(this).children().eq(0).css({
            background: "#f60",
            color: "#fff"
        }).next().addClass("main_active");

    });
    $("#nav").on("mouseout", ".main-l-cont li", function () {

        $(this).children().eq(0).css({
            background: "#fff",
            color: "#666"
        }).next().removeClass("main_active");
    });

    $("#nav").on("mouseleave", ".main-l-cont", function () {

        $(this).css("display", "none");
    });

    //以下为页脚footer事件

    $("#footer").on("mouseover", ".hotarea_t ul li", function () {
        $(".hotarea-b").eq($(this).attr("index")).addClass("on_hot").siblings().removeClass("on_hot");
        $(this).addClass("onhot").siblings().removeClass("onhot");
    });

    $("#footer").on("mouseover", ".footer-firendlink .firendlink-t dd", function () {
        $(".firendlink-b .firendlink-b-c ").eq($(this).attr("index")).addClass("ontbsmain").siblings().removeClass("ontbsmain");
        $(this).addClass("active").siblings().removeClass("active");
    });
})();


