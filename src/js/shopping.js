; (() => {
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
    })

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
                    })
                }
                new shopping({
                    res: res,
                    goods: $.cookie("goods")
                })
                //事件添加购物车
                new goodsadd.goodsadd;
                goLazyload('img[data-src], .back-url', "#main", onScroll.onScroll);
            }
        })
        //历史记录
        new cookieadd.cookieadd();
    })

    class shoppingccnxh {
        constructor(options) {
            this.res = options.res
            this.init()
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
                    this.num = this.goods[i].num
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
            })
            //放大镜鼠标进入事件
            $("#main").on("mouseover", ".smallimg", function (e) {
                let bigbox = $(this).next();
                let span = $(this).children().eq(1);
                let smalliimg = $(this).children().eq(0);
                span.css("display", "block");
                bigbox.css("display", "block");
                $(this).next().width()
                let w = $(this).next().width() / $(this).next().children().width() * $(this).children().eq(0).width();
                let h = $(this).next().height() / $(this).next().children().height() * $(this).children().eq(0).height();
                w = parseInt(w);
                h = parseInt(h);
                span.width(w).height(h);
                // 设置宽高
                span.css({
                    left: e.pageX - $(this).position().left,
                    top: e.pageY - $(this).position().top
                })
                // console.log(e.pageX,e.pageY);
            })
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
                })
                //设置bigbox的宽高
                let il = l / (smalliimg.width() - span.width()) * (bigimg.width() - bigbox.width());
                let it = t / (smalliimg.height() - span.height()) * (bigimg.height() - bigbox.height());
                bigimg.css({
                    left: -il,
                    top: -it
                })
                bigbox.css("border", "1px solid #000")
            })
            //放大镜鼠标移出事件
            $("#main").on("mouseout", ".smallimg", function () {
                let bigbox = $(this).next();
                let span = $(this).children().eq(1);
                span.css("display", "none");
                bigbox.css("display", "none");
            })
            //数量变更，减少
            $("#main").on("click", ".reduce", function () {

                let num = $(this).next().val();
                --num;
                if (num < 1) {
                    num = 1;
                }
                $(this).next().val(num);
                _this.yunsuan();
            })
            //数量变更，增加
            $("#main").on("click", ".add", function () {

                let num = $(this).prev().val();
                if (num < 1) {
                    num = 1;
                }
                num++;
                $(this).prev().val(num);
                _this.yunsuan();
            })
        }
        yunsuan() {
            let countnall = $("#main").find(".countnall");
            let num = $("#main").find(".price_number").val();
            let price = this.cont.price.substr(1);
            if (num > 19 && num < 100) price = price - 1;
            if (num >= 100) price = price - 2;
            // console.log(price , num)
            // console.log(countnall.html());
            let s = "¥" + (price * num).toFixed(2).toString()
            countnall.html(s)
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
            })
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
                $("#main").find(".main-tl").attr("goodsid",this.id);
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