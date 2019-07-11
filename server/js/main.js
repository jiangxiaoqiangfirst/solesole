; (function () {
    //需要才用模块
    "use strict";   //使用严格模式
    require.config({
        // baseUrl:"module",
        paths: {
            // nav:"module-nav",
            // tab:"module-tab",
            jq: "../libs/jquery2.2.4"
        }
    })


    require(["jq"], function (_) {
        // console.log(nav)
        // console.log(tab)
        console.log($);
    })
})();

