/**
 * Created by Administrator on 2017/7/17 0017.
 */

var mosqueId;
function mosqueId(mosqueId){
    var reg = new RegExp("(^|&)" + mosqueId + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
mosqueId=mosqueId('mosqueId');

var userId;
function userId(userId){
    var reg = new RegExp("(^|&)" + userId + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
userId=userId('userId');

var areaCode;
function areaCode(areaCode){
    var reg = new RegExp("(^|&)" + areaCode + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
areaCode=areaCode('areaCode');

var latitude;
function latitude(latitude){
    var reg = new RegExp("(^|&)" + latitude + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
latitude=latitude('latitude');

var longitude;
function longitude(longitude){
    var reg = new RegExp("(^|&)" + longitude + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
longitude=longitude('longitude');

var param={
    'mosqueId':mosqueId,
    'userId':userId,
    'areaCode':areaCode,
    'latitude':latitude,
    'longitude': longitude
};
$.post(address+'/share/mosque_share.json',param,function(result){
    var html='';
    var data=result.data;
    var pic='';
    if(result.code==0){
        var _pic_data=data.picUrl;
        if(_pic_data==null||_pic_data==''){
            _pic_data='images/public/3@2x.png';
            pic+=`
              <div class="swiper-slide">
                    <img src="${_pic_data}" alt=""/>
               </div> 
            `;
        }else{
        //遍历轮播图片

            _pic_data=data.picUrl.split(',');
        for(var i=0;i<_pic_data.length;i++){
            pic+=`
              <div class="swiper-slide">
                    <img src="${_pic_data[i]}" alt=""/>
               </div> 
            `;
        }
        }
        function introduce_container_(){
            if(data.introduce==null||data.introduce==""){
                return `
                        <div class="container">
            <div class="container_text">
                <div class="container_title">
                    介绍
                </div>
                <div class="container_content" style="color: #999">
                    <div>
                        小编正在整理中...
                    </div>
                    
                </div>
            </div>
        </div>
                `;
            }else{
                return `
        <div class="container">
            <div class="container_text">
                <div class="container_title">
                    介绍
                </div>
                <div class="container_content">
                    <div>
                        ${data.introduce}
                    </div>
                    
                </div>
            </div>
        </div>                
                `;
            }
        }
        var introduce_container =introduce_container_();

        //添加拨打电话
        var phoneContainer='';
        var phone_data=data.phone;
        if(!phone_data){
            phoneContainer+=``;
            // $('.restaurant_concat_tel').on('click touchend',function(){
            //     alert('该餐厅展示没有联系方式!');
            // })
        }else{
            var phone=data.phone.split(',');
            var this_phone='';
            for(var p=0;p<phone.length;p++){
                this_phone+=`
                   <a href="tel: ${phone[p]}">${phone[p]}</a>
                `;
            }
            phoneContainer+=`
                            <div class="restaurant_tel">
                                <div class="modal_tel">
                                    <div class="modal_tel_phone">
                                        ${this_phone}
                                    </div>
                                    <div class="modal_tel_abolish" data-click="hideModal">
                                        取消
                                    </div>
                                </div> 
                            </div>            
            `;
        }


        html+=`
        
        <!--banner 图片轮播 end-->
            <div class="swiper-container">
                    <div class="swiper-wrapper">
                        ${pic}
                    </div>
                    <!-- 分页控制器-->
                    <div class="swiper-pagination"></div>
              </div>
        <!-- banner address start-->
        <div class="banner_address">
            <div class="banner_address_title">
                ${data.mosqueName}
            </div>
            <div class="banner_address_area">
                <span class="banner_address_area_left">${data.districtName}</span>
                <span>${data.distances}</span>
            </div>
            <div class="border"></div>
            <div class="banner_address_come">
                <span class="bannner_adress_footprint"></span>
                <span>谁来过(
                <i>${data.reachCount}</i>
                ) &gt;
            </span>
            </div>
        </div>
        <!-- banner address end-->

        <!--concat address start-->
        <div class="contact_address">
            <div class="contact_address_content">
                <div>
                    <div class="concat_address_icon"></div>
                    <div class="concat_address_content">
                        地址:
                        <i>${data.address}</i>
                    </div>
                </div>
                <div>
                    <span class="bor-lef"></span>

                    <span class="concat_address_phone" data-click="showModal">
                           ${phoneContainer}
                    </span>  
                </div>
            </div>
        </div>
        <!--concat address end-->
        <!-- content container start -->
        
        ${introduce_container}
        
         <div class="Islamic_footer">
            <div class="Islamic_footer_ico"></div>
        </div>
        
        
                <!--底部 ico start-->
        <div class="footer_ico clear-f">
            <div class="ico_left clear-f f-l">
                <div class="icon_pic f-l"></div>
                <div class="f-l icon_text">
                    <div class="icon_text_one">
                        纯真生活
                    </div>
                    <div class="icon_text_two">
                        五秒找到放心清真餐厅
                    </div>
                </div>
            </div>
            <div class="f-r icon_right">
                <div class="icon_btn">
                    立即下载
                </div>
                <div class="icon_close" onclick="closeIcon(this)"></div>
            </div>
        </div>
        <!--底部 ico end-->
        `;
    }
    $('.body_container').html(html);
    //拨打电话
    //切换 电话模态框
    var phonedata={
        showModal : function showModal(event){

            if(!data.phone){
                alert('该餐厅展示没有联系方式!');
            }else{
                $('.restaurant_tel').show();
            }
        },
        hideModal : function hideModal(event){
            event.stopPropagation();
            $('.restaurant_tel').hide();
        }
    }
    $('.contact_address_content').on('touchend',"[data-click]",function(e){
        phonedata[$(this).attr("data-click")](e ? e: window.event)
    });
    $('title').html(data.mosqueName)
    //banner 轮播 切换
    var mySwiper = new Swiper ('.swiper-container', {
        // autoplay:3000,
        pagination : '.swiper-pagination',
        paginationClickable :true,
        paginationType: 'fraction'
    })
})


