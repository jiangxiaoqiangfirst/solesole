define(() => {
    "use strict";
    class HoverEvent {
        constructor(ele, className) {
            console.log(ele);
            this.ele = ele;
            this.className = className;
            this.init();
        }
        init() {
            var that = this;
            this.ele.hover(function () {
                $(this).addClass(that.className).css("background", "#fff").children().eq(0).css("borderColor", "#666").end().eq(1).stop().show().css("zIndex", "9");
            }, function () {
                $(this).removeClass(that.className).css("background", "transparent").children().eq(0).css("borderColor", "transparent").end().eq(1).stop().hide().css("zIndex", "-1");
            })
        }
    };
    return {
        HoverEvent: HoverEvent
    }
})