; define(function () {
    "use strict";
    class maindata {
        constructor() {
            this.str = "";
            this.init();

        }
        init() {
            $.getJSON("",function(res){
                console.log(res);
            })
        }
    }

    return {
        maindata: maindata
    }
});