; (() => {
    "use strict";
    require.config({
        baseUrl: "../libs/",
        paths: {
            jquery: "jquery2.2.4",
            cookie: "../module/jquery.cookie"
        }
    })
    require(["jquery", "cookie"], function (_, cookie) {
        let status = $.cookie("status");
        console.log(status);
        if (status == undefined) {
            //没有点击事件，默认为注册
            new register;
            //待删除
        } else {
            status = JSON.parse(status);
            if (status.land == 0) {
                //根据元素点击注册的结果，执行注册
                new register;

            } else if (status.land == 1) {
                //根据元素点击登陆的结果，执行登陆
                new land;
            }

        }
    })

    class land {
        constructor() {
            this.everybody = 0;
            this.body = "";
            this.somebody = $.cookie("somebody") == undefined ? [] : JSON.parse($.cookie("somebody"));
            this.init()
            this.addEvent();
        }
        init() {
            this.display()
        }
        addEvent() {
            let _this = this;
            //点击切换到注册内容
            $("#main").find(".no-margin").on("click", ".register", function () {
                $.cookie("status", '{"land":"0"}')
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
                        }
                        someone = JSON.stringify(someone);
                        $.cookie("someone", someone, { path: "/" });
                        window.location.href = "http://localhost:8282/index.html"
                    } else {
                        alert("用户名密码错误,请重新输入");
                    }
                } else {

                }
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

        };
        mans() {
            let someone = this.regists.val();
            let on = this.somebody.some((v, i, s) => {
                return v.name == someone;
            })
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
            this.display()
        }
        //添加事件，事件委托
        addEvent() {
            let _this = this;
            //切换到登陆界面
            $("#header").on("click", ".go_land", function () {
                $.cookie("status", '{"land":"1"}');
                // new land;
            })

            // 注册验证
            $("#main").on("input", ".regist", function () {
                // console.log((this.className).split(" "))
                this.everybody = 0;
                _this.regist = $(this).children("input");
                _this.t = (this.className).split(" ")[0]
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
            })
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
            })
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

            })

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
                })
                if (on) {
                    //重复了
                    return;
                }
                s.push({ name: name, tel: tel });
                s = JSON.stringify(s);
                $.cookie("somebody", s);
            } else {
                //不存在就直接，存
                $.cookie("somebody", JSON.stringify([{ name: name, tel: tel }]))
            }
        }
        //用户名验证
        man() {
            // console.log(this.regist.val());
            //字母开头，数字字母下划线中划线组成，6-16位
            let s = new RegExp(/^[a-zA-Z]\w{5,15}$/)
            let on = s.test(this.regist.val())
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
                })
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
                    }).html("字母开头，数字字母下划线中划线组成，6-16位")
                }
            }
        }
        // 用户名重复验证
        mansure() {
            if ($.cookie("somebody")) {
                let s = JSON.parse($.cookie("somebody"));
                let on = s.some((v, i, s) => {
                    return this.regist.val() == v.name;
                })
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
                        }).html("名字重复了")
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
            let s = new RegExp(/^1[3|4|5|7|8][0-9]{9}$/)
            let on = s.test(this.regist.val())
            if (on) {
                //  去除样式
                this.everybody = 1;
                this.regist.removeClass("error");
                this.regist.next(".error").removeClass("error").css({
                    display: "none"
                })
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
                    })
                }
            }
        }
        //数字验证
        bacord() {
            let s = new RegExp(/^[0-9]{4,}$/)
            let on = s.test(this.regist.val())
            if (on) {
                //  去除样式
                this.everybody = 1;
                this.regist.removeClass("error");
                this.regist.next(".error").removeClass("error").css({
                    display: "none"
                })
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
                    })
                }
            }
        }
        //渲染注册页面部分
        display() {
            $("#header").find(".land_register").html("欢迎注册");
            let str = "";
            str = `<span>我是会员，点此</span>
                    <a  class="go_land" href="http://localhost:8282/html/land.html">登陆</a>`
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