/**
 * Created by Administrator on 2017/7/18 0018.
 */
//banner 轮播 切换

var userId;
function userId(userId){
    var reg = new RegExp("(^|&)" + userId + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
userId=userId('userId');

    $.post(address+'/share/home_share.json',{'userId':userId},function(result){
        console.log(result);
        var data=result.data;
        var html='';
        var banner_pic='';
        var sex_pic='';
        var wish_list='';
        if(result.code==0){
            var pic=data.headUrls.split(',');
            console.log(pic)
            for(var i=0;i<pic.length;i++){
                banner_pic+=`
                <div class="swiper-slide">
                        <img src="${pic[i]}" alt=""/>
                </div>
                `;
            }

            if(data.sex==1){
                sex_pic=`<img src="images/man.png" alt="">`;
            }else if(data.sex==2){
                sex_pic=`<img src="images/woman.png" alt="">`;
            }

            var wish_list_data=data.wishList;
            for(var k=0;k<wish_list_data.length;k++){
                wish_list+=`
                  <div class="user_pic_list f-l">
                        <img src="${wish_list_data[k].wishImgUrl}" alt="">
                        <div>
                            ${wish_list_data[k].wishName}
                        </div>
                    </div>           
                `;
            }
            html+=`

        <div class="banner_container">
            
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    ${banner_pic}
                </div>
                
                <div class="swiper-pagination"></div>
            </div>
            
            <div class="my_data">
                <div class="user_grade f-r">
                    <div class="user_dengji">
                        LV. <i>${data.gradeName}</i>
                    </div>
                    <div class="user_integral">
                        积分: <i>${data.scoreBalance}k</i>
                    </div>
                </div>
                <div class="user_message">
                    <div class="clear-f user_name">
                        <div class="f-l">
                            ${data.realName}
                        </div>
                        <div class="user_sex f-l">
                            ${sex_pic}
                        </div>
                    </div>
                    <div class="user_age">
                    <span class="user_nianling">
                        年龄:
                    </span>
                        <span>
                          ${data.age}  
                    </span>
                    </div>
                    <div class="user_clan">
                    <span class="user_xingzuo">
                        ${data.conTellAtion}
                    </span>
                        <span>
                        ${data.nationName}
                    </span>
                    </div>
                    <div class="user_information">
                        资讯详情&gt;
                    </div>
                </div>
            </div>
        </div>
        <!-- 用户操作按钮 start -->
        <div class="user_btn clear-f">
            <div class=" f-l">
                <div class="bor-rig">
                    <div class="user_btn_title">
                        关注
                    </div>
                    <div>
                        ${data.follow}
                    </div>
                </div>
            </div>
            <div class=" f-l">
                <div class="bor-rig">
                    <div class="user_btn_title">
                        食评
                    </div>
                    <div>
                        ${data.comment}
                    </div>
                </div>
            </div>
            <div class=" f-l">
                <div class="bor-rig">
                    <div class="user_btn_title">
                        签到
                    </div>
                    <div>
                        ${data.reach}
                    </div>
                </div>
            </div>
        </div>
        <!-- 用户操作按钮 end -->
        <!-- 用户 心愿单 start -->
        <div class="user_wish_list">
            <div class="bg_fa"></div>
            <div class="user_list">
                <div class="user_list_title clear-f">
                    <div class="f-l user_list_left">
                    <span>
                        心愿单
                    </span>
                        <span class="user_count">(${data.wish})</span>
                    </div>
                    <div class="f-r user_more">
                        <div class="">
                            更多&gt;
                        </div>
                    </div>
                </div>
            </div>
           <div class="user_operation_pic">
                <div class="user_list_container clear-f">
                    ${wish_list}
                </div>
           </div>
        </div>
        <!-- 用户 心愿单 end -->
        
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
        };
        $('.my_details_container').html(html);
        $('title').html(data.realName+'已经成为PURE的LV.'+data.gradeName);

        var mySwiper = new Swiper ('.swiper-container', {
            autoplay:3000,
            pagination : '.swiper-pagination',
            paginationClickable :true,
            paginationType: 'bullets'
        })
    })
