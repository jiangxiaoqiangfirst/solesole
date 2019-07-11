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