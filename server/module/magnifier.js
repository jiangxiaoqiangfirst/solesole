define(() => {
    function Magnifier(options) {
        // this.samllbox = document.querySelector(".samll-box");
        // this.samllimg = document.querySelector(".samll-box img");
        // this.span = document.querySelector(".samll-box span")
        // this.bigbox = document.querySelector(".big-box");
        // this.bigimg = document.querySelector(".big-box img");
        // this.imgbox = document.querySelector(".imgbox");
        this.samllbox = options.samllBox;
        this.samllimg = options.samllImg;
        this.span = options.samllSpan;
        this.bigbox = options.bigBox;
        this.bigimg = options.bigImg;
        this.imgbox = options.ImgBox; //多张图片的布局

        // html布局
        //     <div class="magnifier">
        //     <div class="samll-box">
        //         <img src="./img/11.jpg" alt="">
        //         <span class="span"></span>
        //         <!-- <p></p> -->
        //     </div>
        //     <div class="big-box">
        //         <img src="./img/11.jpg" alt="">
        //     </div>
        // </div>
        // <div class="imgbox">
        //     <img src="./img/11.jpg" alt="">
        //     <img src="./img/5.jpg" alt="">
        //     <img src="./img/2.jpg" alt="">
        //     <img src="./img/3.jpg" alt="">
        //     <img src="./img/6.jpg" alt="">
        //     <img src="./img/7.jpg" alt="">
        //     <img src="./img/8.jpg" alt="">
        //     <img src="./img/9.jpg" alt="">
        //     <img src="./img/12.jpg" alt="">
        //     <img src="./img/10.jpg" alt="">
        // </div>

        // console.log(this.sallbox,this.samllimg,this.span,this.bigbox,this.bigimg)
        // this.init();
        // console.log(this.imgbox);
        this.addEvent();
    }
    Magnifier.prototype = {
        constructor: Magnifier,
        init: function () {
            // 1设置span的宽高
            // console.log(this);
            // 重点span的宽高设置
            var w = parseInt(this.bigbox.offsetWidth / this.bigimg.offsetWidth * this.samllimg.offsetWidth);
            var h = parseInt(this.bigbox.offsetHeight / this.bigimg.offsetHeight * this.samllimg.offsetHeight);
            this.span.style.width = w + "px";
            this.span.style.height = h + "px";
        },
        addEvent: function () {
            //鼠标进入出现
            this.mouseover();
            // 鼠标离开消失
            this.mouseout();

            //鼠标移动，left/top跟随移动
            this.mousemove();
            //点击事件
            this.click();
        },
        mouseover: function () {
            this.samllbox.addEventListener("mouseover", () => {
                this.bigbox.style.display = "block";
                this.span.style.display = "block";
                this.init();
            }, false);
        },
        mouseout: function () {
            this.samllbox.addEventListener("mousemove", (eve) => {
                var e = eve || window.event;
                // console.log(e.pageX,e.pageY)
                var x = parseInt(e.pageX - this.span.offsetWidth / 2 - this.samllbox.offsetLeft);
                var y = parseInt(e.pageY - this.span.offsetHeight / 2 - this.samllbox.offsetTop);
                if (x < 0) x = 0;
                if (x > this.samllbox.offsetWidth - this.span.offsetWidth) x = this.samllbox.offsetWidth - this.span.offsetWidth;
                if (y < 0) y = 0;
                if (y > this.samllbox.offsetHeight - this.span.offsetHeight) y = this.samllbox.offsetHeight - this.span.offsetHeight;
                //设置span的left,top
                this.span.style.left = x + "px";
                this.span.style.top = y + "px";

                //设置bigimg的left,top

                //          bigimg  bigimg     bigbox    bigimg  bigimg     bigbox
                //          span   samllbox    span      span   samllbox    span
                // 比例关系 的left/(大边宽-小边宽）是相等的，    top/(大高-小高)；
                // 左边运动的left,top 的获取；
                var l = (this.bigimg.offsetWidth - this.bigbox.offsetWidth) / (this.samllbox.offsetWidth - this.span.offsetWidth) * this.span.offsetLeft;
                var t = (this.bigimg.offsetHeight - this.bigbox.offsetHeight) / (this.samllbox.offsetHeight - this.span.offsetHeight) * this.span.offsetTop;
                // console.log(l, t)
                this.bigimg.style.left = -l + "px";
                this.bigimg.style.top = -t + "px";

            }, false)
        },
        mousemove: function () {
            this.samllbox.addEventListener("mouseout", () => {
                this.bigbox.style.display = "none";
                this.span.style.display = "none";
            }, false)
        },
        click: function () {
            this.imgbox.addEventListener("click", (eve) => { //点击事件委托
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                // console.log(target);
                this.samllimg.src = target.src;
                this.bigimg.src = target.src;
            }, false)
        }

    }
    return {
        magnifier: Magnifier
    }
})
