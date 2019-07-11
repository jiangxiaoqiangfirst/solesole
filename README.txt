
使用require.js模块化，框架使用jquery，模块文件放在在module文件夹中，jquery.js,requier.js放在libs文件夹

一、文件夹有server文件夹,src文件夹,readme.txt文件
    1.1 server为服务器根目录，里面的index.html为主页面，地址为：http://localhost:8282/index.html，本地服务器环境下，端口号为8282，分页在html文件夹中，路径为http://localhost:8282/html/*.html;
        1.1.1 主页面上有楼层，三级菜单，二级菜单，banner图，登陆/注册，购物车有功能，简单的鼠标滑过动画，图片懒加载；
        1.1.2 主页面登陆/注册功能在页面最上面，banner图后面的没有写功能；
        1.1.3 我的购物车有功能，数据使用cookie来存储的，商品内容在json文件夹中；
        1.1.4 进入商品详情页面，点击左边小的轮播图即可,首页有链接；
        1.1.5 页面的公共部分，有common.html（common文件夹）,common.js（common文件夹的js文件夹）,common.css（css文件夹）；
        1.1.6 每个页面都使用了模块化，没有全局的，代码都使用严格模式"use strict";  
    1.2 src为编写源文件，使用gulp工具编写;

二、路径
    2.1 Github的路径为：git@github.com:jiangxiaoqiangfirst/solesole.git
    2.2 模块文件路径 server/module/
    2.3 scss的文件路径 src/sass/
    2.4 css路径 server/css
    2.5 json数据文件路径 server/json/
    2.6 jquery.js,requier.js文件路径 server/libs/
    2.7 主页面路径 server/index.html
    2.8 页面js路径 server/js
    2.9 图片路径 server/img

三、亮点
    3.1 将页面的公共html,css,js进行分离，jquery.load引入公共的html,link标签引入css,script标签引入js,公共js也使用了模块化；
    3.2 图片有懒加载，背景图也有懒加载，背景图要添加class名为“back-url”，data-src为实际图片路径，img不需要class名，但也要data-src实际图片路径；
    3.3 楼层会根据滚动条位置显示隐藏，还会根据楼层位置，显示当前楼层位置；
    3.4 登陆注册功能在每个页面都是通用的；
    3.5 注册页面，已有用户名，不许注册；
    3.6 登陆页面，不能登陆不存在的用户名，-------密码为手机号-------；

四、不足
    4.1 没有搜索功能；
    4.2 数据不全，切数据存cookie，容量有限，有大量数据要换数据库操作；
    4.3 公共js与每个页面的js不能相互调用，数据只能通过cookie,local Storage 或 Session,后台获取修改存储；
    4.4 没有写记录功能，页面关了，数据就没有了；
    4.5 代码太多了，需要合并相同代码；
    5.5 购物车页面没有写删除物品与页头商品物品内容，删除时内容不一致，跳转页面内容会变一致；
    5.6 密码设置没有写，用的密码为手机号；

五、页面点击事件
    5.1 购物车总价会根据选中的商品变化，商品数量变化了，也会变化，全选有功能；
    5.2 页头我的购物车，点击前往购物车；
    5.3 页头登陆/注册/登出都有功能；
    5.4 主页第一个轮播图点击会前往商品列表页；
    5.5 商品列表每个商品都有详情页；
    5.6 商品详情页会有猜猜你喜欢，也有功能，数量可以修改；
    5.7 注册页面，已有用户名，不许注册；
