
var userId;
function userId(userId){
    var reg = new RegExp("(^|&)" + userId + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
userId=userId('userId');

var epage;
function epage(epage){
    var reg = new RegExp("(^|&)" + epage + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
epage=epage('epage');

var pagesize;
function pagesize(pagesize){
    var reg = new RegExp("(^|&)" + pagesize + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
pagesize=pagesize('pagesize');

var longitude;
function longitude(longitude){
    var reg = new RegExp("(^|&)" + longitude + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
longitude=longitude('longitude');

var latitude;
function latitude(latitude){
    var reg = new RegExp("(^|&)" + latitude + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
latitude=latitude('latitude');

var wishId;
function wishId(wishId){
    var reg = new RegExp("(^|&)" + wishId + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
wishId=wishId('wishId');

var param={
    'epage':epage,
    'pagesize':pagesize,
    'longitude':longitude,
    'latitude':latitude,
    'wishId':wishId,
    'userId':userId
}
$.post(address+'/share/wish_share.json',param,function(result){
    console.log(result);
    var html='';
    var re_list='';
    var person_wish='';
    if(result.code==0){
        var restaurant=result.data;
        for(var i=0;i<restaurant.length;i++){
            var jiu='';
            var typeName='';
            var _typeName_length=restaurant[i].typeName;
            if(_typeName_length==null||_typeName_length==''){
                return ``;
            }else{
                var typeName_length=restaurant[i].typeName.split(',');
                for(var k=0;k<typeName_length.length;k++){
                    typeName+=`
                <span>${typeName_length[k]}</span>
                `;
                }
            }
            if(restaurant[i].isWineForbid==0){
                jiu+=``;
            }else if(restaurant[i].isWineForbid==1){
                jiu+=`
                <span>
                   无<i>酒</i>
                </span>
                `;
            }
            // 心愿单 列表缺省图片

            if(restaurant[i].picture==null||restaurant[i].picture==''){
                restaurant[i].picture='images/public/7@2x.png';
            }
            re_list+=`
                <div class="restaurant_container">
                    <div class="restaurant_list box">
                        <div class="">
                            <div class="restaurant_pic">
                                <img src="${restaurant[i].picture}" alt="">
                            </div>
                        </div>
                        <div class=" restaurant_details">
                            <div class="restaurant_name">
                                ${restaurant[i].restaurantName}
                                
                                ${jiu}
                            </div>
                            <div class="restaurant_feature">
                                ${typeName}
                            </div>
                            <div class="restaurant_address">
                            <span class="">
                                ${restaurant[i].districtName}
                            </span>
                                <span class="bor">|</span>
                                <span>
                                ${restaurant[i].distances}
                            </span>
                            </div>
                        </div>
                    </div>
                </div>            
            `;
        }
        if(result.isOfficalTopic==0){
            if(result.wishImgUrl==null||result.wishImgUrl==''){
                 if(result.sex ==1){
                     result.wishImgUrl='images/public/1man.png';
                 }
                 if(result.sex ==0){
                     result.wishImgUrl='images/public/1woman.png';
                 }else{
                     result.wishImgUrl='images/public/1sex_unknown.png';
                 }
            }
            person_wish+=`
           <div class="wish_text_three clear-f">
                <div class="f-r">
                            <div class="box a_i_c">
                                <div class="wish_person_pic">
                                    <img src="${result.headUrls}" alt="">
                                </div>
                                <div class="wish_person_name">
                                    ${result.nickName}的心愿单
                                </div>
                            </div>
                </div>                        
           </div> 
            `;
        }else{
            person_wish=``;
        }
        //缺省心愿单分享主图
        if(result.headUrls==null||result.headUrls==''){
            result.headUrls='images/public/4@2x.png';
        }
        html+=`
        <!-- 心愿单 start -->
        <div class="wish_container">
            <div class="box">
                <div class=" wish_pic">
                    <img src="${result.wishImgUrl}" alt="">
                </div>
                <div class=" wish_introduce">
                    <div class="wish_text_one">
                        ${result.wishName}
                    </div>
                    <div class="wish_text_two">
                        ${result.wishSummary}
                    </div>
                    ${person_wish}
                    <div class="wish_four">
                    <span>
                        <i>${result.recordCount}</i>家餐厅
                    </span>
                        <span class="wish_collect">
                        <i>${result.collectCount}</i>次收藏
                    </span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 心愿单 end -->
        <!-- 餐厅列表 start -->
        ${re_list}
        <!-- 餐厅列表 end -->
        
        <!--底部 ico start-->

        `;
    }else{
        alert(result.msg)
    }
    $('.container').html(html);
    if(result.nickName==null||result.nickName==''){
        $('title').html('心愿单分享');
    }else{
        $('title').html(result.nickName+'的心愿单分享');
    }


    //点击关闭 icon
    $('.footer_ico .icon_close').click(function(){
        $('.footer_ico').hide();
    })
})