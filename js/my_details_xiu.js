
//用户userId
var userId;
function userId (userId) {
    var reg = new RegExp("(^|&)" + userId + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
userId=userId('userId');
$.post(address+'/share/home_share.json',{'userId':userId},function(result) {
    console.log(result);
    var data = result.data;
    var swiper_wrapper = '';
    var my_data='';
    var person_first='';
    var sex='';
    var person_second='';
    if (result.code == 0) {
        var _header_pic = data.headUrls;
        if (_header_pic == null || _header_pic == '') {
            return swiper_wrapper += `
                <div class="swiper-slide">
                    <img src="images/public/21@2x.png" alt=""/>
                </div>            
            `;
        } else {
            var header_pic = data.headUrls.split(',');
            for (var i = 0; i < header_pic.length; i++) {
                swiper_wrapper += `
                <div class="swiper-slide">
                    <img src="${header_pic[i]}" alt=""/>
                </div>            
            `;
            }
        }
        my_data+=`
            <div class="user_grade f-r">
                <div class="user_dengji">
                    LV. <i>${data.gradeName}</i>
                </div>
                <div class="user_integral">
                    积分: <i>${data.scoreBalance}k</i>
                </div>
            </div>        
        `;
        if(data.sex==1){
            sex+=`
                <img src="images/man.png" alt="">
            `;
        }else if(data.sex==2){
            sex+=`
                <img src="images/woman.png" alt="">
            `;
        }else if(data.sex==0){
            sex+=`
                <img src="images/public/sex_unknown.png" alt="">
            `;
        }

        function is(data){
            if(data.realName==null||data.realName==''){
                data.realName='请您填写名字';
            }
            if(data.age==null||data.age==''){
                data.age='0';
            }
            if(data.conTellAtion==null||data.conTellAtion==''){
                data.conTellAtion='属于你的是什么星座呢';
            }
            if(data.careerName==''||data.careerName==null){
                data.careerName='选择一下你从事的行业吧';
            }
            if(data.cityName==null||data.cityName==''){
                data.cityName='让你认识更多的同城伙伴';
            }
            if(data.cityNameHome==null||data.cityNameHome==''){
                data.cityNameHome='你的家乡是哪里呢';
            }
            if(data.personSign==null||data.personSign==''){
                data.personSign='向大家介绍一下你吧'
            }
            if(data.nationName==null||data.nationName==''){
                data.nationName='56个民族你属于哪一个'
            }
        }
        is(data);

        person_first+=`
            <div class="person_name clear-f">
                <div class="f-l">${data.nickName}</div>
                <div class="f-l sex">
                    ${sex}
                </div>
            </div>
            <div class="person_age">
                年龄:  <span>${data.age}</span>
            </div>
            <div class="person_Minority">
                <span>${data.conTellAtion}</span> <span>${data.nationName}</span>
            </div>        
        `;

        person_second+=`
        <div class="person_occupation clear-f">
                <div class="f-l">
                    职业
                </div>
                <div class="f-l">
                    ${data.careerName}
                </div>
            </div>
            <div class="person_city clear-f">
                <div class="f-l">
                    所在城市
                </div>
                <div class="f-l">
                    ${data.cityName}
                </div>
            </div>
            <div class="person_hometown clear-f">
                <div class="f-l">
                    家乡
                </div>
                <div class="f-l">
                    ${data.cityNameHome}
                </div>
            </div>
            <div class="person_signature clear-f">
                <div class="f-l">个性签名</div>
                <div class="f-l">
                    ${data.personSign}
                </div>
            </div>
        `;

    }
    $('.swiper-wrapper').html(swiper_wrapper);
    $('.my_data').html(my_data);
    $('.person_first').html(person_first);
    $('.person_second').html(person_second);
    // $('title').html(data.nickName);

    var mySwiper = new Swiper ('.swiper-container', {
        // autoplay:3000,
        pagination : '.swiper-pagination',
        paginationClickable :true,
        paginationType: 'bullets'
    })
})
