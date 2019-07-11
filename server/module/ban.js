
; define(function () {
    "use strict";
    class Ban {
        constructor(options) {
            this.ite = options.ite;
            this.items = options.items;
            this.left = options.left;
            this.right = options.right;
            this.w = this.ite.width();
            this.wl = this.items.eq(0).innerWidth();
            this.index = 0;
            this.maxnum = this.items.length;
            this.l = this.leftEvent.bind(this);
            this.r = this.rightEvent.bind(this);
            this.init();
        }
        init() {
            this.items.parent().css("width",this.wl*this.items.length*2);
            this.left.click(this.l);
            this.right.click(this.r);
            this.playAuto();
        }
        leftEvent() {
            this.direct = -1;
            this.leftchange()
        };
        rightEvent() {
            this.direct = 1;
            this.leftchange();
        }
        leftchange() {
            if (this.direct == 1) {
                //this.direct = 1时向左运动
                if (this.index == 0) {
                    this.ite.children().eq(0).css("left", -this.items.length * this.wl);
                    this.index = this.items.length - 1
                } else {
                    this.index--;
                }
            } else if (this.direct == -1) {
                if (this.index == this.items.length) {
                    this.ite.children().eq(0).css("left", 0);
                    this.index = 1;
                } else {
                    this.index++;
                }
            }
            this.move();
        }
        move() {
            this.ite.children().eq(0).stop().animate({
                left: -this.index * this.wl
            }, 500)
        }
        playAuto() {
            this.timer;
            let that = this;
            this.timer = setInterval(() => {
                that.l();
            }, 3000);

            this.ite.hover(function () {
                clearInterval(that.timer);
            }, function () {
                that.timer = setInterval(() => {
                    that.l();
                }, 2000);
            })
        }

    }

    return {
        ban: Ban
    }
});
