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
(() => {
    "use strict";
    //利用jquery的banner插件写轮播图
    // 加载模块

    require.config({
        //查找小模块的基目录
        baseUrl: "../module",
        // 给小模块的路径
        paths: {
            jquery: "../libs/jquery2.2.4",
            banner: "banner",
            ban: "ban",
            maindata: "maindata",
            onScroll: "lazyload"
        }
    });
    // console.log(99)
    // 引入模块
    require(["jquery", "banner", "ban", "maindata", "onScroll"], function ($, banner, ban, m, scorll) {
        $(".main-l .banner01").banner({
            list: true,
            listStyles: {
                parent: {
                    width: 150,
                    bottom: "200px"
                },
                children: {
                    boxShadow: "none",
                    background: "transparent",
                    border: "1px solid #fff",
                    borderRadius: "50%"
                },
                active: {
                    width: "30px",
                    height: "30px",
                    lineHeight: "30px",
                    boxShadow: "rgb(235, 97, 4) 0 0 5px"
                }
            },
            items: $(".banner01 .imgbox").children(),
            left: $(".banner01 .left"),
            right: $(".banner01 .right"),
            autoPlay: "true",
            delayTime: "4000",
            moveTime: "1000",
            index: 3
        });
        $(".main-c .banner02").banner({
            list: true,
            listStyles: {
                parent: {
                    width: 60

                },
                children: {
                    width: 14,
                    height: 14,
                    background: "transparent",
                    border: "1px solid #fff",
                    color: "transparent"
                },
                active: {
                    background: "#fff"
                }
            },
            items: $(".banner02 .imgbox02").children(),
            left: $(".banner02 .left"),
            right: $(".banner02 .right"),
            autoPlay: "true",
            delayTime: "4000",
            moveTime: "1000"
            // index: 3
        });

        new ban.ban({
            ite: $(".main-c .banner03"),
            items: $(".banner03 .imgbox03").children(".copy"),
            left: $(".banner03 .left"),
            right: $(".banner03 .right")
        });
        $.getJSON("../json/data02.json", function (res) {
            // console.log(res);
            if (res.length !== 0) {
                new m.maindata({
                    res: res,
                    item: $("#main").children(".floor").children(".floor-ul")
                });
                goLazyload('img[data-src], .back-url', "body", scorll.onScroll);
            }
        });
    });

    $("#main").on("mouseover", ".main-r-c2-li", function () {
        $(this).children().eq(1).css("display", "block").end().eq(0).addClass("active").end().parent().siblings().children().eq(1).css("display", "none").end().eq(0).removeClass("active");
    });

    //定义一个运行加载图片的函数的函数
    function goLazyload(ele, context, fn) {
        var lazyImgs = $.map($(ele, $(context)).get(), function (i) {
            return $(i);
        });
        // lazyImgs内容是不正确的，因为是浅拷贝，onScroll函数在删除数组内容，console.log(lazyImgs);
        // 绑定事件:
        $(window).scroll(fn.bind(null, lazyImgs));
        // 手动触发一次:
        fn(lazyImgs);
    }
})();
//这里总是要写的，还是在js里面写吧
;(() => {
    "use strict";

    require.config({
        baseUrl: "../libs/",
        paths: {
            jquery: "jquery2.2.4",
            cookie: "../module/jquery.cookie"
        }
    });
    require(["jquery", "cookie"], function (_, cookie) {
        let status = $.cookie("status");
        console.log(status);
        if (status == undefined) {
            //没有点击事件，默认为注册
            new register();
            //待删除
        } else {
            status = JSON.parse(status);
            if (status.land == 0) {
                //根据元素点击注册的结果，执行注册
                new register();
            } else if (status.land == 1) {
                //根据元素点击登陆的结果，执行登陆
                new land();
            }
        }
    });

    class land {
        constructor() {
            this.everybody = 0;
            this.body = "";
            this.somebody = $.cookie("somebody") == undefined ? [] : JSON.parse($.cookie("somebody"));
            this.init();
            this.addEvent();
        }
        init() {
            this.display();
        }
        addEvent() {
            let _this = this;
            //点击切换到注册内容
            $("#main").find(".no-margin").on("click", ".register", function () {
                $.cookie("status", '{"land":"0"}');
                self.location.href = "http://localhost:8282/html/land.html";
            });
            // 验证登陆
            $("#main").find(".no-margin").on("change", ".regists", function () {
                let s = this.className.split(" ")[0];
                _this.regists = $(this).children("input").eq(0);
                switch (s) {
                    case "mans":
                        _this.mans();
                        break;
                    case "tels":
                        _this.tels();
                        break;
                }
            });
            //输入内容前，清空数据
            $("#main").find(".no-margin").on("focus", ".regists", function () {
                $(this).children("input").eq(0).val("");
            });
            //登陆验证
            $("#main").find(".no-margin").on("click", ".landbtn-a", function () {
                if (_this.everybody == 1) {
                    _this.everybody = 0;
                    console.log(_this.body);
                    let on = _this.somebody.some((v, i, s) => {
                        return _this.body == v.name && _this.telval == v.tel;
                    });
                    if (on) {
                        let someone = {
                            name: _this.body,
                            tel: _this.telval,
                            landon: 1
                        };
                        someone = JSON.stringify(someone);
                        $.cookie("someone", someone, { path: "/" });
                        window.location.href = "http://localhost:8282/index.html";
                    } else {
                        alert("用户名密码错误,请重新输入");
                    }
                } else {}
                // console.log(this);
                // console.log(_this.somebody)
            });

            //备注
            $("#main").find(".no-margin").on("blur", ".bodyname", function () {
                if ($(this).val() == "") {
                    $(this).val("请输入用户名");
                }
            });
            //备注
            $("#main").find(".no-margin").on("blur", ".telnum", function () {
                if ($(this).val() == "") {
                    $(this).val("请输入密码");
                }
            });
        }
        mans() {
            let someone = this.regists.val();
            let on = this.somebody.some((v, i, s) => {
                return v.name == someone;
            });
            //
            if (on) {
                //用户名存在
                this.regists.removeClass("error");
                this.everybody = 1;
                this.body = this.regists.val();
            } else {
                //用户名不存在
                this.everybody = 0;
                this.body = "";
                this.regists.addClass("error").val("用户名不存在");
            }
        }
        tels() {
            //待添加事件
            this.telval = this.regists.val();
            // console.log($.cookie("somebody"),"somebody")
            // console.log(this.regists, 889);
        }
        display() {
            $("#header").find(".land_register").html("欢迎登陆");
            let str = "";
            str = `<span class="head-land-help">如遇到登录问题，请拨打客服热线 </span>
                <i>400-888-5105</i>`;
            $("#header").find(".header-r").html(str);
            str = "";
            str = `<div class="margin clear">
                <div class="land-l"></div>
                <div class="land clear">
                    <div class="land-head">
                        <span>会员登陆</span>
                        <a class="register" href="##">立即注册</a>
                        <i class="cont-t"></i>
                    </div>
                    <div class="land-cont">
                        <div class="mans regists">
                            <input class="bodyname" type="text" value="请输入用户名">
                            <span>忘记用户名了吗？</span>
                        </div>
                        <div class="tels  regists">
                            <input class="telnum" type="text" value="请输入密码">
                            <span>忘记密码了吗？</span>
                        </div>
                        <div class="check ">
                            <input class="checkmima" type="checkbox" checked>
                            <span>记住登录名与手机号</span>
                        </div>
                    </div>
                    <div class="landbtn">
                        <!-- 登陆成功后跳转首页 -->
                        <a class="landbtn-a" href="##">登陆</a>
                    </div>
                    <div class="other-land">
                        <p>其它方式登陆</p>
                        <ul class="clear">
                            <li>
                                <a href="##">
                                    <i class="cont i1"></i>
                                    <span>手机</span>
                                </a>
                            </li>
                            <li>
                                <a href="##">
                                    <i class="cont i2"></i>
                                    <span>QQ</span>
                                </a>
                            </li>
                            <li>
                                <a href="##">
                                    <i class="cont i3"></i>
                                    <span>微信</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>`;
            $("#main").find(".register-c").html(str).parent().parent().removeClass("margin").addClass("no-margin");
        }
    }
    //注册页面
    class register {
        constructor() {
            this.sss = 1;
            this.init();
            this.ok = $("#main").find(".ok").children(".success");
            this.addEvent();
        }
        init() {
            this.display();
        }
        //添加事件，事件委托
        addEvent() {
            let _this = this;
            //切换到登陆界面
            $("#header").on("click", ".go_land", function () {
                $.cookie("status", '{"land":"1"}');
                // new land;
            });

            // 注册验证
            $("#main").on("input", ".regist", function () {
                // console.log((this.className).split(" "))
                this.everybody = 0;
                _this.regist = $(this).children("input");
                _this.t = this.className.split(" ")[0];
                switch (_this.t) {
                    case "man":
                        _this.man();
                        break;
                    case "tel":
                        _this.tel();
                        break;
                    case "bacord":
                        _this.bacord();
                        break;
                }
            });
            //表单验证结果
            $("#main").on("click", ".success", function () {
                if (_this.sss == 0) {
                    //    不做处理
                } else if (_this.sss == 1) {
                    if (_this.everybody) {
                        // console.log(999, "success")
                        _this.addcookie();
                        //注册成功前往登陆页面
                        $.cookie("status", '{"land":"1"}');
                        //前往页面
                        window.location.href = "http://localhost:8282/html/land.html";
                        // document.
                        // new land;
                    } else {
                            // console.log("条件不成立",_this.sss,"_this.sss")
                        }
                }
            });
            //勾选项
            $("#main").on("click", ".checkbox", function () {
                if (this.checked) {
                    _this.sss = 1;
                    _this.ok.css({
                        width: 280,
                        background: "#e60012",
                        color: "#fff"
                    });
                } else {
                    _this.sss = 0;
                    _this.ok.css({
                        width: 300,
                        background: "#333",
                        color: "#999"
                    });
                }
            });
        }
        //存cookie数据
        addcookie() {
            let name = $("#main").find(".register-c").find(".bodyname").val();
            let tel = $("#main").find(".register-c").find(".telnum").val();;
            if ($.cookie("somebody")) {
                //存在就接着原来的数据，存
                let s = JSON.parse($.cookie("somebody"));
                let on = s.some((v, i, s) => {
                    return name == v.name;
                });
                if (on) {
                    //重复了
                    return;
                }
                s.push({ name: name, tel: tel });
                s = JSON.stringify(s);
                $.cookie("somebody", s);
            } else {
                //不存在就直接，存
                $.cookie("somebody", JSON.stringify([{ name: name, tel: tel }]));
            }
        }
        //用户名验证
        man() {
            // console.log(this.regist.val());
            //字母开头，数字字母下划线中划线组成，6-16位
            let s = new RegExp(/^[a-zA-Z]\w{5,15}$/);
            let on = s.test(this.regist.val());
            if (on) {
                //读取cookie的注册信息，比较是否相同
                this.mansure();
                if (this.namecopy == 1) {
                    this.namecopy = 0;
                    return;
                }
                this.everybody = 1;
                //  去除样式
                this.regist.removeClass("error");
                this.regist.next(".error").removeClass("error").css({
                    display: "none"
                });
            } else {
                //增加样式
                this.everybody = 0;
                this.regist.addClass("error");
                this.addlebel = this.regist.next(".addlebel");
                if (!this.addlebel.length) {
                    this.regist.after("<label class='error addlebel'>字母开头，数字字母下划线中划线组成，6-16位</label>");
                } else {
                    this.regist.next(".addlebel").addClass("error").css({
                        display: "inline"
                    }).html("字母开头，数字字母下划线中划线组成，6-16位");
                }
            }
        }
        // 用户名重复验证
        mansure() {
            if ($.cookie("somebody")) {
                let s = JSON.parse($.cookie("somebody"));
                let on = s.some((v, i, s) => {
                    return this.regist.val() == v.name;
                });
                // console.log(on,"on999");
                if (on) {
                    //重复了
                    this.regist.addClass("error");
                    this.addlebel = this.regist.next(".addlebel");
                    if (!this.addlebel.length) {
                        this.regist.after("<label class='error addlebel'>名字重复了</label>");
                    } else {
                        this.regist.next(".addlebel").addClass("error").css({
                            display: "inline"
                        }).html("名字重复了");
                    }
                    this.namecopy = 1;
                    return;
                }
                console.log($.cookie("somebody"));
            }
        }
        //电话验证
        tel() {
            //为手机号码
            let s = new RegExp(/^1[3|4|5|7|8][0-9]{9}$/);
            let on = s.test(this.regist.val());
            if (on) {
                //  去除样式
                this.everybody = 1;
                this.regist.removeClass("error");
                this.regist.next(".error").removeClass("error").css({
                    display: "none"
                });
            } else {
                //增加样式
                this.everybody = 0;
                this.regist.addClass("error");
                this.addlebel = this.regist.next(".addlebel");
                if (!this.addlebel.length) {
                    this.regist.after("<label class='error addlebel'>11位手机号码</label>");
                } else {
                    this.regist.next(".addlebel").addClass("error").css({
                        display: "inline"
                    });
                }
            }
        }
        //数字验证
        bacord() {
            let s = new RegExp(/^[0-9]{4,}$/);
            let on = s.test(this.regist.val());
            if (on) {
                //  去除样式
                this.everybody = 1;
                this.regist.removeClass("error");
                this.regist.next(".error").removeClass("error").css({
                    display: "none"
                });
            } else {
                //增加样式
                this.everybody = 0;
                this.regist.addClass("error");
                this.addlebel = this.regist.next(".addlebel");
                if (!this.addlebel.length) {
                    this.regist.after("<label class='error addlebel'>4位以上数字数字</label>");
                } else {
                    this.regist.next(".addlebel").addClass("error").css({
                        display: "inline"
                    });
                }
            }
        }
        //渲染注册页面部分
        display() {
            $("#header").find(".land_register").html("欢迎注册");
            let str = "";
            str = `<span>我是会员，点此</span>
                    <a  class="go_land" href="http://localhost:8282/html/land.html">登陆</a>`;
            $("#header").find(".header-r").html(str);
            str = "";
            str = `<form id="formss" class="formss" action="">
                        <div class="man regist">
                            <span>用户名</span>
                            <input class="bodyname" type="text">
                        </div>
                        <div class="tel regist">
                            <span>手机号码</span>
                            <input class="telnum" type="text">
                        </div>
                        <div class="bacord regist">
                            <span>注册码</span>
                            <input required type="text">

                        </div>
                    </form>

                    <div class="tongyi">
                        <input class="checkbox" checked type="checkbox">
                        <i class="cont"></i>
                        <span>我已经阅读并接受 </span>
                        <a href="##">《搜了网注册用户服务条款》</a>
                    </div>
                    <div class="ok">
                        <a class="success" href="##">免费注册</a>
                    </div>
                </div>`;
            $("#main").find(".register-c").html(str).parent().parent().addClass("margin").removeClass("no-margin");
        }
    }
})();
;(() => {
    "use strict";

    require.config({
        baseUrl: "../module",
        paths: {
            jquery: "../libs/jquery2.2.4",
            // goodsadd: "goodsadd",
            // cookieadd: "cookieadd",
            cookie: "jquery.cookie",
            onScroll: "lazyload"

        }
    });
    require(["jquery", "cookie", "onScroll"], function (_, cookie, onScroll) {
        $.ajax({
            url: "http://localhost:8282/json/data01.json",
            success: function (res) {
                new mycar({
                    res: res,
                    goods: $.cookie("goods") == undefined ? [] : JSON.parse($.cookie("goods")),
                    car: $.cookie("goods") == undefined ? [] : JSON.parse($.cookie("mycar"))
                });
                goLazyload('img[data-src], .back-url', "#main", onScroll.onScroll);
            }
        });
    });

    class mycar {
        constructor(options) {
            this.res = options.res;
            this.goods = options.goods;
            this.car = options.car;
            this.data = [];
            this.deletegoods = 0;
            this.init();
            this.addEvent();
        }

        init() {
            //获取数据
            this.dataget();
            this.display();
            this.suan();
        }
        addEvent() {
            let _this = this;
            this.onoff = 0;
            this.checkall = $("#main").find(".allcheck");
            //增加
            $("#main").on("click", ".reduce", function () {
                _this.s = $(this).next().val();
                _this.s--;
                if (_this.s <= 1) {
                    _this.s = 1;
                }
                $(this).next().val(_this.s);
                _this.changeid = $(this).parent().parent().attr("goodid");
                _this.cookiechange();
                _this.suan();
            });
            //减少
            $("#main").on("click", ".add", function () {
                _this.s = $(this).prev().val();
                _this.s++;
                if (_this.s <= 1) {
                    _this.s = 1;
                }
                $(this).prev().val(_this.s);
                _this.changeid = $(this).parent().parent().attr("goodid");
                _this.cookiechange();
                _this.suan();
            });
            //改变数量
            $("#main").on("change", "input[type=text]", function () {
                _this.s = $(this).val();
                if (_this.s < 1) {
                    _this.s = 1;
                }
                $(this).val(_this.s);
                _this.changeid = $(this).parent().parent().attr("goodid");
                _this.cookiechange();
                _this.suan();
            });
            //单个选项
            $("#main").on("click", ".mycheck", function () {
                _this.check = $("#main").find(".tbod").find(".mycheck");
                for (let i = 0; i < _this.check.length; i++) {
                    if (_this.check[i].checked == false) {
                        this.onoff = 1;
                        break;
                    };
                }
                if (this.onoff) {
                    // console.log(this.all,this.all.checked );
                    _this.checkall[0].checked = false;
                    this.onoff = 0;
                } else {
                    _this.checkall[0].checked = true;
                }
                _this.suan();
            });
            //全选和全部取消
            $("#main").on("click", ".allcheck", function () {
                _this.check = $("#main").find(".tbod").find(".mycheck");
                if (this.checked == false) {
                    for (let i = 0; i < _this.check.length; i++) {
                        _this.check[i].checked = false;
                    }
                } else {
                    for (let i = 0; i < _this.check.length; i++) {
                        _this.check[i].checked = true;
                    }
                }
                _this.suan();
            });
            //删除事件
            $("#main").on("click", ".spa", function () {
                $(this).parent().parent().remove();
                _this.changeid = $(this).parent().parent().attr("goodid");
                _this.deletegoods = 1;
                _this.cookiechange();
                _this.suan();
            });
        }
        suan() {
            this.all = 0;
            let ls;
            this.check = $("#main").find(".tbod").find(".mycheck");
            for (let i = 0; i < this.check.length; i++) {
                if (this.check[i].checked) {
                    ls = this.check.eq(i).parent().next().next().next().next();
                    this.all += ls.html().substr(1) * ls.next().children("input").val();
                }
            }
            if (this.all == 1) {
                this.all = 0;
            }
            let s = "¥" + this.all.toFixed(2);
            $("#main").find(".tbod").find(".countsall").html(s);
        }
        display() {
            let str = "";
            let s = 1;
            for (let i = 0; i < this.data.length; i++) {
                str += `<tr goodid=${this.data[i].ip}>
                    <td><input class="mycheck" type="checkbox" checked></td>
                    <td>商品${i + 1}</td>
                    <td class="imgs"><img data-src="${this.data[i].src[0]}" src="../img/timg.gif" alt=""></td>
                    <td>${this.data[i].tip}</td>
                    <td>${this.data[i].price}</td>
                    <td class="ramss clear">
                        <a class="reduce" href="##">-</a>
                        <input type="text" value="${this.data[i].num}">
                        <a class="add" href="##">+</a>
                    </td>
                    <td><span class="spa">删除</span></td>
                </tr>`;
                s = this.data[i].price.substr(1) * this.data[i].num;
            }
            str += `<tr class="all">
                    <td>全选 <input type="checkbox" class="allcheck" checked></td>
                    <td>总价</td>
                    <td class="countsall" colspan="4">¥${s.toFixed(2)}</td>
                    <td><input class="maidan" type="button" value="去结算"></td>
                </tr>`;
            if (str) {
                $("#main").find(".tbod").html(str);
            }
        }
        //运行参数删选，挑选cookie里面id商品包含的全部内容
        dataget() {
            for (let i = 0; i < this.car.length; i++) {
                this.res.some((v, j, s) => {
                    // console.log(this.car[i].id,v.ip)
                    if (this.car[i].id == v.ip) {
                        this.data.push(v);
                        this.data[this.data.length - 1].num = this.car[i].num;
                        //  找全了停止some循环；数据在this.data身上
                        return true;
                    }
                });
            }
        }
        //改变cookie部分内容
        cookiechange() {
            this.car = $.cookie("mycar") == undefined ? [] : JSON.parse($.cookie("mycar"));
            if (this.deletegoods) {
                this.deletegoods = 0;
                this.car = $.cookie("mycar") == undefined ? [] : JSON.parse($.cookie("mycar"));
                this.car.some((v, i, s) => {
                    return this.changeid == v.id && this.car.splice(i, 1);
                });
                $.cookie("mycar", JSON.stringify(this.car));
            } else {
                this.car.some(v => {
                    return this.changeid == v.id && (v.num = this.s);
                });
                $.cookie("mycar", JSON.stringify(this.car));
            }
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
;(() => {
    "use strict";

    require.config({
        baseUrl: "../module",
        paths: {
            jquery: "../libs/jquery2.2.4",
            cookie: "jquery.cookie",
            cookieadd: "cookieadd",
            onScroll: "lazyload",
            goodsadd: "goodsadd"
        }
    });

    require(["jquery", "cookie", "cookieadd", "onScroll", "goodsadd"], function (_, cookie, cookieadd, onScroll, goodsadd) {
        // console.log($.cookie("goods"), "goods-shopping")
        $.ajax({
            url: "http://localhost:8282/json/data01.json",
            success: function (res) {
                let s = Math.floor(Math.random() * 30 + 5);
                if (res.length > s + 2) {
                    //渲染页面的 猜猜你喜欢部分内容
                    new shoppingccnxh({
                        res: res.slice(s, s + 2)
                    });
                }
                new shopping({
                    res: res,
                    goods: $.cookie("goods")
                });
                //事件添加购物车
                new goodsadd.goodsadd();
                goLazyload('img[data-src], .back-url', "#main", onScroll.onScroll);
            }
        });
        //历史记录
        new cookieadd.cookieadd();
    });

    class shoppingccnxh {
        constructor(options) {
            this.res = options.res;
            this.init();
        }
        init() {
            let str;
            str = "";

            for (let i = 0; i < 2; i++) {
                str += `<div class="ccnxh-cc goods" goodsid=${this.res[i].ip} >
                        <a href="http://localhost:8282/html/shopping.html"><img src="../img/timg.gif" data-src="${this.res[i].src[0]}" alt="">
                            <p class="tip over">${this.res[i].tip}</p><span class="price">${this.res[i].price}</span>
                        </a>
                    </div>`;
            }
            $("#main").children(".main-top").children(".ccnxh").children(".ccnxh-cont").html(str);
        }
    }
    class shopping {
        constructor(options) {
            this.res = options.res;
            this.goods = options.goods == undefined ? {} : JSON.parse(options.goods);
            this.id = this.goods[0];
            this.init();
            this.addEvent();
        }
        init() {
            // console.log(this.res, this.goods);
            //选出内容
            // console.log(this.goods)
            for (let i = 1; i < this.goods.length; i++) {
                if (this.id == this.goods[i].id) {
                    this.num = this.goods[i].num;
                    break;
                }
            }
            // console.log(this.num);
            if (JSON.stringify(this.goods) !== "{}") {
                this.display();
            }
        }

        addEvent() {
            //事件委托
            let _this = this;
            $("#main").on("click", ".imgs img", function () {

                $(this).addClass("active").siblings().removeClass("active").parent().prev().children().eq(0).attr("src", $(this).attr("data-src")).parent().prev().children().eq(0).attr("src", $(this).attr("data-src"));
            });
            //放大镜鼠标进入事件
            $("#main").on("mouseover", ".smallimg", function (e) {
                let bigbox = $(this).next();
                let span = $(this).children().eq(1);
                let smalliimg = $(this).children().eq(0);
                span.css("display", "block");
                bigbox.css("display", "block");
                $(this).next().width();
                let w = $(this).next().width() / $(this).next().children().width() * $(this).children().eq(0).width();
                let h = $(this).next().height() / $(this).next().children().height() * $(this).children().eq(0).height();
                w = parseInt(w);
                h = parseInt(h);
                span.width(w).height(h);
                // 设置宽高
                span.css({
                    left: e.pageX - $(this).position().left,
                    top: e.pageY - $(this).position().top
                });
                // console.log(e.pageX,e.pageY);
            });
            //放大镜鼠标滑动事件
            $("#main").on("mousemove", ".smallimg", function (e) {
                let bigbox = $(this).next();
                let bigimg = bigbox.children().eq(0);
                let span = $(this).children().eq(1);
                let smalliimg = $(this).children().eq(0);

                // 设置span宽高
                let l = e.pageX - $(this).offset().left - span.width() / 2;
                let t = e.pageY - $(this).offset().top - span.height() / 2;
                //限制span范围
                if (l < 0) l = 0;
                if (t < 0) t = 0;
                if (l > smalliimg.width() - span.width()) {
                    l = smalliimg.width() - span.width();
                }
                if (t > smalliimg.height() - span.height()) {
                    t = smalliimg.height() - span.height();
                }
                //设置span left和top
                span.css({
                    left: l,
                    top: t
                });
                //设置bigbox的宽高
                let il = l / (smalliimg.width() - span.width()) * (bigimg.width() - bigbox.width());
                let it = t / (smalliimg.height() - span.height()) * (bigimg.height() - bigbox.height());
                bigimg.css({
                    left: -il,
                    top: -it
                });
                bigbox.css("border", "1px solid #000");
            });
            //放大镜鼠标移出事件
            $("#main").on("mouseout", ".smallimg", function () {
                let bigbox = $(this).next();
                let span = $(this).children().eq(1);
                span.css("display", "none");
                bigbox.css("display", "none");
            });
            //数量变更，减少
            $("#main").on("click", ".reduce", function () {

                let num = $(this).next().val();
                --num;
                if (num < 1) {
                    num = 1;
                }
                $(this).next().val(num);
                _this.yunsuan();
            });
            //数量变更，增加
            $("#main").on("click", ".add", function () {

                let num = $(this).prev().val();
                if (num < 1) {
                    num = 1;
                }
                num++;
                $(this).prev().val(num);
                _this.yunsuan();
            });
        }
        yunsuan() {
            let countnall = $("#main").find(".countnall");
            let num = $("#main").find(".price_number").val();
            let price = this.cont.price.substr(1);
            if (num > 19 && num < 100) price = price - 1;
            if (num >= 100) price = price - 2;
            // console.log(price , num)
            // console.log(countnall.html());
            let s = "¥" + (price * num).toFixed(2).toString();
            countnall.html(s);
        }
        display() {
            this.cont = {};
            let onoff = 0;
            let str = "";
            onoff = this.res.some((v, i, s) => {
                if (this.id == v.ip) {
                    this.cont = JSON.parse(JSON.stringify(v));
                    return true;
                }
            });
            str = `
            <div class="smallimg">
            <img data-src="${this.cont.src[0]}" src="../img/timg.gif" alt="">
            <span class="imgspan"></span>
        </div>
        <div class="bigbox">
            <img data-src="${this.cont.src[0]}" src="../img/timg.gif" alt="">
        </div>
        <div class="imgs clear">`;
            if (this.cont.src.length == 1) {
                str += `<img class="active" data-src="${this.cont.src[0]}" src="../img/timg.gif"
            alt="">`;
            } else {
                for (let i = 1; i < this.cont.src.length; i++) {
                    if (i == 1) {
                        str += `<img class="active" data-src="${this.cont.src[i]}" src="../img/timg.gif"
            alt="">`;
                    } else {
                        str += `<img data-src="${this.cont.src[i]}" src="../img/timg.gif"
                alt="">`;
                    }
                };
            }
            str += `</div>
                <a class="baoba" href="##">
                    <i></i><span>收藏宝贝</span>
                </a>`;
            if (onoff) {
                $("#main").find(".main-tl").find(".mtc-l").html(str);
            }

            str = `<div class="mtc-r-t tip">
            <p>${this.cont.tip}</p>
            <span>热卖商品</span>
        </div>
        <div class="mtc-r-price">
            <div class="mtc-r-price-lll">
                <p>价格</p>
                <a href="##">数量</a>
            </div>
            <div class="mtc-r-price-l">
                <p>${this.cont.price.substr(1)}</p>
                <a href="##">1-19件</a>
            </div>
            <div class="mtc-r-price-l">
                <p>${(this.cont.price.substr(1) - 1).toFixed(2)}</p>
                <a href="##">20-99件</a>
            </div>
            <div class="mtc-r-price-l">
                <p>${(this.cont.price.substr(1) - 2).toFixed(2)}</p>
                <a href="##">100以上</a>
            </div>
        </div>
        <div class="mtc-r-number">
            <p>商品货号<span>876543</span></p>
        </div>
        <div class="mtc-r-go clear">
            <span class="mtc-r-gol l">物流</span>
            <span class="mtc-r-gol originform">浙江 温州市 <s>至</s></span>
            <div class="mtc-r-gol checkto">
                <p class="tit"><span>广东广州市</span><i class="cont"></i></p>
                <div class="checkto-cont">
                    <!-- 大量数据内容,这里是三级菜单 -->
                </div>
            </div>
            <span class="mtc-r-gol kdf">快递:10.00</span>
        </div>
        <div class="mtc-r-dingong clear">
            <div class="l">订购数量</div>
            <table>
                <thead>
                    <tr>
                        <th>起售量 (件)</th>
                        <th>标准价</th>
                        <th>采购量</th>
                        <th>是否有货</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>${this.cont.price} </td>
                        <td class="ram">
                            <a class="reduce" href="##">-</a>
                            <input class="price_number" type="text" value="${this.num}">
                            <a class="add" href="##">+</a>
                        </td>
                        <td>有货</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="countn">
            <div class="l">
                总价
            </div>
            <div class="countnall">¥${(this.cont.price.substr(1) * this.num).toFixed(2)}</div>
        </div>`;
            // console.log(this.cont.price.substr(1) , this.num)
            if (onoff) {
                $("#main").find(".main-tl").find(".mtc-r").html(str);
                $("#main").find(".main-tl").attr("goodsid", this.id);
            }
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