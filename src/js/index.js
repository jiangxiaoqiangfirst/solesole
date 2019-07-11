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
    })
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
        })
        $(".main-c .banner02").banner({
            list: true,
            listStyles: {
                parent: {
                    width: 60,

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
            moveTime: "1000",
            // index: 3
        })

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

        })
    })

    $("#main").on("mouseover", ".main-r-c2-li", function () {
        $(this).children().eq(1).css("display", "block").end().eq(0).addClass("active").end().parent().siblings().children().eq(1).css("display", "none").end().eq(0).removeClass("active");
    })

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
    
})()
//这里总是要写的，还是在js里面写吧

