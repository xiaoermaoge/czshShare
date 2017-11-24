var address='http://api.halalo2o.cn';
// var address='http://139.129.251.119:1021';

//点击关闭 icon
$('.footer_ico .icon_close').click(function(){
    $('.footer_ico').hide();
});

function closeIcon(obj){
        $(obj).parent().parent().hide();
}




$('.icon_btn').on('touchend',function(){

        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isAndroid) {
            function android() {
                window.location.href = "purelife://purelife:8888/login";
                /***打开app的协议，有安卓同事提供***/
                window.setTimeout(function () {
                    window.location.href = "http://url.cn/4EMbYq6";
                    /***打开app的协议，有安卓同事提供***/
                }, 100);
            };
            android();
        }
        if(isiOS){
            function ios(){
                var str= navigator.userAgent.toLowerCase();
                var ver=str.match(/cpu iphone os (.*?) like mac os/);
                var bb_=ver[1].indexOf('_');

                var bb=ver[1].substring(0,bb_);

                 window.location.href = "purelife://";
                /***打开app的协议，有安卓同事提供***/
                 window.setTimeout(function () {
                     window.location.href = "https://itunes.apple.com/us/app/%E7%BA%AF%E7%9C%9F%E7%94%9F%E6%B4%BB/id1185291713?mt=8";

                 }, 500);

                // if(bb<9){
                //     window.location.href = "czsh://purelife";
                //     /***打开app的协议，有安卓同事提供***/
                //     window.setTimeout(function () {
                //         window.location.href = "https://itunes.apple.com/us/app/%E7%BA%AF%E7%9C%9F%E7%94%9F%E6%B4%BB/id1185291713?mt=8";
                //         /***打开app的协议，有安卓同事提供***/
                //
                //     }, 500);
                // }else if(bb>=9){
                //     var ifr = document.createElement("iframe");
                //     ifr.src = "https://www.sunmear.com/share/"; /***打开app的协议，有ios同事提供***/
                //     ifr.style.display = "none";
                //     document.body.appendChild(ifr);
                //     /***打开app的协议，有安卓同事提供***/
                //     window.setTimeout(function () {
                //         window.location.href = "https://itunes.apple.com/us/app/%E7%BA%AF%E7%9C%9F%E7%94%9F%E6%B4%BB/id1185291713?mt=8";
                //         /***打开app的协议，有安卓同事提供***/
                //
                //     }, 2000);
                // }


            };
            ios();
        }

})