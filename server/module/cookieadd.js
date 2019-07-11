; define(() => {
    "use strict";
    //点击商品历史记录的cookie
    class cookieAdd {
        constructor() {
            this.goodsobj = [];
            this.addEvent()
        }
        addEvent() {
            let _this = this;
            $("#main").on("click", ".goods", function () {
                let nowid = "";
                nowid = $(this).attr("goodsid");

                if ($.cookie("goods") === undefined) {
                    _this.goodsobj = [nowid, { id: nowid, num: 1 }];
                } else {
                    let ls, onoff;
                    //读数据
                    ls = JSON.parse($.cookie("goods"));
                    onoff = ls.some((v, i, s) => {
                        // console.log(v.id, nowid);
                        if(i>1){
                            return v.id == nowid && v.num++;
                        }
                    })
                    //利用数组的some方法，返回值为 true，则是满足条件;false表示不满足条件
                    _this.goodsobj = JSON.parse(JSON.stringify(ls));
                    if(!onoff){
                        _this.goodsobj.push({ id: $(this).attr("goodsid"), num: 1 })
                    }
                }
                // 存数据
                _this.goodsobj.splice(0, 1, nowid)
                $.cookie("goods", JSON.stringify(_this.goodsobj));
            });
        }
    }
    return {
        cookieadd: cookieAdd
    }
});