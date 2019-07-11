; define(function () {
    "use strict";
    class maindata {
        constructor(options) {
            this.res = JSON.parse(JSON.stringify(options.res));
            this.a = ["<i>1F</i>安防", "<i>2F</i>电子", "<i>3F</i>装潢", "<i>4F</i>机械", "<i>5F</i>皮革", "<i>6F</i>家电", "<i>7F</i>五金", "<i>8F</i>运动", "<i>9F</i>食品", "<i>10F</i>服装", "<i>11F</i>玩具", "<i>12F</i>数码"]
            this.item = options.item;
            this.str = "";
            this.init();
            this.addEvent();

        }
        init() {
            let str = "";
            for (let i = 0; i < 12; i++) {
                str += `<li class="fl f${i + 1} clear">
                <div class="fl-l fl-cont">
                    <div class="fl-cont-title ">
                        ${i + 1}F<span class="title-s1">${this.res[i].ft[0]}</span>/<span class="title-s2">${this.res[i].ft[1]}</span>
                    </div>
                    <div class="fl-cont-c">
                        <p class="fl-cont-cp">${this.res[i].p}</p>
                        <span class="fl-cont-cs">${this.res[i].span}</span>
                        <img class="fl-cont-ci" data-src="${this.res[i].src[0]}" src="./img/timg.gif" alt="">
                    </div>
                </div>
                <div class="fl-r fl-cont">
                    <div class="fl-r-l ">
                        <dl class="fl-r-l-dl">
                            <dt class="fl-r-l-dt">
                                <a href="##">${this.res[i].title.split(" ")[0].split("-")[0]}</a><a href="##">${this.res[i].title.split(" ")[0].split("-")[1]}</a></dt>
                            <dd class="fl-r-l-dd">
                                <a href="##">监控器</a><a href="##">支架</a><a href="##">护罩、球罩</a><a href="##">云台</a><a
                                    href="##">机械门锁</a><a href="##">IC卡锁</a><a href="##">指纹锁</a>
                            </dd>
                        </dl>
                        <dl class="fl-r-l-dl">
                            <dt class="fl-r-l-dt">
                                <a href="##">视频监控</a>
                                <a href="##">安防锁具</a>
                            </dt>
                            <dd class="fl-r-l-dd">
                                <a href="##">监控器</a>
                                <a href="##">支架</a>
                                <a href="##">护罩、球罩</a>
                                <a href="##">云台</a>
                                <a href="##">机械门锁</a>
                                <a href="##">IC卡锁</a>
                                <a href="##">指纹锁</a>
                            </dd>
                        </dl>
                        <dl class="fl-r-l-dl">
                            <dt class="fl-r-l-dt">
                                <a href="##">视频监控</a>
                                <a href="##">安防锁具</a>
                            </dt>
                            <dd class="fl-r-l-dd">
                                <a href="##">监控器</a>
                                <a href="##">支架</a>
                                <a href="##">护罩、球罩</a>
                                <a href="##">云台</a>
                                <a href="##">机械门锁</a>
                                <a href="##">IC卡锁</a>
                                <a href="##">指纹锁</a>
                            </dd>
                        </dl>
                        <dl class="fl-r-l-dl">
                            <dt class="fl-r-l-dt">
                                <a href="##">视频监控</a>
                                <a href="##">安防锁具</a>
                            </dt>
                            <dd class="fl-r-l-dd">
                                <a href="##">监控器</a>
                                <a href="##">支架</a>
                                <a href="##">护罩、球罩</a>
                                <a href="##">云台</a>
                                <a href="##">机械门锁</a>
                                <a href="##">IC卡锁</a>
                                <a href="##">指纹锁</a>
                            </dd>
                        </dl>
                        <dl class="fl-r-l-dl">
                            <dt class="fl-r-l-dt">
                                <a href="##">视频监控</a>
                                <a href="##">安防锁具</a>
                            </dt>
                            <dd class="fl-r-l-dd">
                                <a href="##">监控器</a>
                                <a href="##">支架</a>
                                <a href="##">护罩、球罩</a>
                                <a href="##">云台</a>
                                <a href="##">机械门锁</a>
                                <a href="##">IC卡锁</a>
                                <a href="##">指纹锁</a>
                            </dd>
                        </dl>
                        <dl class="fl-r-l-dl">
                            <dt class="fl-r-l-dt">
                                <a href="##">视频监控</a>
                                <a href="##">安防锁具</a>
                            </dt>
                            <dd class="fl-r-l-dd">
                                <a href="##">监控器</a>
                                <a href="##">支架</a>
                                <a href="##">护罩、球罩</a>
                                <a href="##">云台</a>
                                <a href="##">机械门锁</a>
                                <a href="##">IC卡锁</a>
                                <a href="##">指纹锁</a>
                            </dd>
                        </dl>
                        <dl class="fl-r-l-dl">
                            <dt class="fl-r-l-dt">
                                <a href="##">视频监控</a>
                                <a href="##">安防锁具</a>
                            </dt>
                            <dd class="fl-r-l-dd">
                                <a href="##">监控器</a>
                                <a href="##">支架</a>
                                <a href="##">护罩、球罩</a>
                                <a href="##">云台</a>
                                <a href="##">机械门锁</a>
                                <a href="##">IC卡锁</a>
                                <a href="##">指纹锁</a>
                            </dd>
                        </dl>
                        <dl class="fl-r-l-dl">
                            <dt class="fl-r-l-dt">
                                <a href="##">视频监控</a>
                                <a href="##">安防锁具</a>
                            </dt>
                            <dd class="fl-r-l-dd">
                                <a href="##">监控器</a>
                                <a href="##">支架</a>
                                <a href="##">护罩、球罩</a>
                                <a href="##">云台</a>
                                <a href="##">机械门锁</a>
                                <a href="##">IC卡锁</a>
                                <a href="##">指纹锁</a>
                            </dd>
                        </dl>
                    </div>
                    <div class="fl-r-c">
                        <a class="flrca1" href="##"><img class="frimg" src="img/timg.gif" data-src="${this.res[i].src[1]}" alt=""></a>
                        <a class="flrca2" href="##"><img class="frimg" src="img/timg.gif" data-src="${this.res[i].src[2]}" alt=""></a>
                    </div>
                    <div class="fl-r-r">
                        <a class="flrra1" href="##"><img class="frimg" src="img/timg.gif" data-src="${this.res[i].src[3]}" alt=""></a>
                    </div>
                </div>     
            </li>`;
            }
            // console.log(this.item);
            this.item.html(str);
            str = "";
            for (let i = 0; i < 12; i++) {
                str += `<a class="fff" href="##">${this.a[i]}</a>`;
            }
            this.item.next().html(str);
        }
        addEvent() {
            let that = this;
            //滑过图片移动效果
            this.item.on("mouseenter", ".frimg", function () {
                $(this).stop().animate({ "left": "10px" }, 100)
            });
            this.item.on("mouseleave", ".frimg", function () {
                $(this).stop().animate({ "left": "1px" }, 100)
            });
            //滑过文字图片移动效果
            this.item.on("mouseenter", ".fl-cont-c", function () {
                $(this).children().eq(0).stop().animate({ "fontSize": "20px" }, 100).end().eq(1).stop().animate({ "fontSize": "16px" }, 100).end().eq(2).stop().animate({ "width": "183px", "height": "218px" }, 100);
            });
            this.item.on("mouseleave", ".fl-cont-c", function () {
                $(this).children().eq(0).stop().animate({ "fontSize": "19px" }, 100).end().eq(1).stop().animate({ "fontSize": "15px" }, 100).end().eq(2).stop().animate({ "width": "180px", "height": "215px" }, 100);
            });
            //楼层
            $(window).scroll(function () {
                if ($(document).scrollTop() > 100 && $(document).scrollTop() < $("#footer").offset().top) {
                    that.item.next().css("display", "block")
                } else {
                    that.item.next().css("display", "none")
                }
                //楼层效果
                let sTop = $(document).scrollTop();
                let $floor = that.item.children().filter(function (index, ele) {
                    return Math.abs($(this).offset().top - sTop) < $(this).height() / 2;
                })
                if ($floor.index() != -1) {
                    that.item.next().children().eq($floor.index()).addClass("active").siblings().removeClass("active");
                }

            })
            this.item.next().on("click", ".fff", function () {
                let s = that.item.children().eq($(this).index()).offset().top
                $("body,html").stop().animate({ "scrollTop": s }, 500);
            })
        }
    }


    return {
        maindata: maindata
    }
});