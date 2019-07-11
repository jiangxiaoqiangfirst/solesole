; define(() => {
    "use strict";
    //购物车的cookie 存储的cookie方法
    class goodsadd {
        constructor() {
            this.car = $("#main").find(".mycar").children(".ce");
            this.suan = $("#main").find(".mycar").children(".suan").children("a");
            this.goods_id = $("#main").find(".main-tl").attr("goodsid");

            this.goodsobj = [];
            this.addEvent();
        }
        addEvent() {
            let _this = this;
            this.car.click(function () {
                //存数据
                // 存之前先读数据
                //没有直接存，若有就判断之前有没有添加
                let nowid = _this.goods_id;
                let num = $("#main").find(".price_number").val();
                if ($.cookie("mycar") === undefined) {
                    _this.goodsobj = [{ id: nowid, num: num }];
                } else {
                    let ls, onoff;
                    //读数据
                    ls = JSON.parse($.cookie("mycar"));
                    onoff = ls.some((v, i, s) => {
                        // console.log(v.id, nowid);
                        return v.id == nowid && (v.num = num);
                    })
                    //利用数组的some方法，返回值为 true，则是满足条件;false表示不满足条件
                    _this.goodsobj = JSON.parse(JSON.stringify(ls));
                    if (!onoff) {
                        //没有对应id的数据
                        _this.goodsobj.push({ id: _this.goods_id, num: num })
                    }
                }
                // 存数据
                $.cookie("mycar", JSON.stringify(_this.goodsobj),{path:"/"});
            });
        }
    }
    return {
        goodsadd: goodsadd
    }
});