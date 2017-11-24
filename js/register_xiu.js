//点击切换 密码图片
$('.password div img').click(function(){
    var pass_img_name=$(this).attr('name');
    if(pass_img_name==1){
        $(this).attr('src','images/public/close_eyes.png');
        $(this).attr('name','0');
        $(this).parent().siblings().attr('type','password');
    }else{
        $(this).attr('src','images/public/puff_eyes.png')
        $(this).attr('name','1');
        console.log($(this).parent().siblings());
        $(this).parent().prev().attr('type','text');
    }
});

//去除显示的ip地址
window.alert = function(name){
    var iframe = document.createElement("IFRAME");
    iframe.style.display="none";
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    window.frames[0].window.alert(name);
    iframe.parentNode.removeChild(iframe);
}




//获取手机号码

var phone;
var verify;
var password;
var name;
var wait = 60;
function time(o) {
//        console.log(o);
    if (wait == 0) {

        $(o).removeAttr("disabled");
        $(o).text("发送验证码");
        console.log(o+"inner");
        wait = 60;
        $(o).css(
            'background','#46c98d'
        )
    } else {
        $(o).prop("disabled", true);
        $(o).text(wait + "秒后重新发送");
        $(o).css(
            'background','#ddd'
        )
        wait--;
        setTimeout(function() {
            time(o)
        }, 1000)
    }
}

$('#sed').click(function(){
    phone=$('#phone').val();

    if(phone==''){
        alert('请输入手机号码!')
    }else if(!(/^1[34578]\d{9}$/.test(phone))){
        alert('请输入正确的手机号码')
    }
    else{
        function checkPhone(){
                var param={
                    'sceneType' : 'register',
                    'userMobile' : phone
                }
                $.post(address+'/open/get_verifycode.json',param,function(result){
                    if(result.code==0){
                        alert('获取验证码成功');

                        var o=$('#sed');
                        time(o,wait);
                    }else{
                        alert(result.msg);
                    }

                })
        }
        checkPhone();
    }
})

//邀请人ID
var userId;
function userId(userId) {
    var reg = new RegExp("(^|&)" + userId + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
userId=userId('userId');

//点击注册
$('#register_btn').click(function(){
    verify=$('#verify').val();
    password=$.md5($('#password').val());
    console.log(password);
    name=$('#name').val();
    phone=$('#phone').val();


    //要请码
    var inviteCode;
    function inviteCode(inviteCode) {
        var reg = new RegExp("(^|&)" + inviteCode + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    inviteCode=inviteCode('inviteCode');

    if(verify==''){
        alert('请填写验证码');
        return false;
    }else if($('#password').val()==''){
        alert('请填写密码');
        return false;
    }else if((/[\u4e00-\u9fa5]+/).test($('#password').val())){
        alert('密码不能输入汉字');
        return false;
    }else if(name=='') {
        alert('请填写昵称');
        return false;
    }


    var register_param={
        'verifyCode' : verify,
        'userMobile' :phone,
        'password' : password,
        'nickName' : name,
        'terminalType' : 'm_h5',
        'terminalModel' : 'm_h5',
        'terminalOsVersion' : 'm_h5',
        'terminalAppVersion' : 'm_h5',
        'userId' : userId,
        'inviteCode' : inviteCode
    };
    $.post(address+'/user/register.json',register_param,function(register){
        if(register.code==0){

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

                    }, 10);
                };
                android();
            }
            if(isiOS){
                function ios(){
                    var str= navigator.userAgent.toLowerCase();
                    var ver=str.match(/cpu iphone os (.*?) like mac os/);
                    var bb_=ver[1].indexOf('_');

                    var bb=ver[1].substring(0,bb_);
                    console.log(ver);
                    console.log(bb);

                    if(bb<9){
                        window.location.href = "czsh://purelife";
                        /***打开app的协议，有安卓同事提供***/
                        window.setTimeout(function () {
                            window.location.href = "https://itunes.apple.com/us/app/%E7%BA%AF%E7%9C%9F%E7%94%9F%E6%B4%BB/id1185291713?mt=8";
                            /***打开app的协议，有安卓同事提供***/

                        }, 500);
                    }else if(bb>=9){
                        var ifr = document.createElement("iframe");
                        ifr.src = "https://www.sunmear.com/share/"; /***打开app的协议，有ios同事提供***/
                        ifr.style.display = "none";
                        document.body.appendChild(ifr);
                        /***打开app的协议，有安卓同事提供***/
                        window.setTimeout(function () {
                            window.location.href = "https://itunes.apple.com/us/app/%E7%BA%AF%E7%9C%9F%E7%94%9F%E6%B4%BB/id1185291713?mt=8";
                            /***打开app的协议，有安卓同事提供***/

                        }, 2000);
                    }


                };
                ios();
            }


        }
       else{
            alert(register.msg);
        }

    })
})

$.post(address+'/user/select_nickname.json',{'userId':userId},function(result){
    console.log(result);
    if(result.nickName==null||result.nickName==''){
        $('title').html('邀请你注册纯真生活');
    }else{
        $('title').html(result.nickName+'邀请你注册纯真生活');
    }
})




