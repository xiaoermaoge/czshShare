
var userId;
function userId(userId){
    var reg = new RegExp("(^|&)" + userId + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
userId=userId('userId');

var commentId;
function commentId(commentId){
    var reg = new RegExp("(^|&)" + commentId + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
commentId=commentId('commentId');

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

var param={
    'commentId' : commentId,
    'longitude' : longitude,
    'latitude' : latitude,
    'userId' : userId
}

$.post(address+'/share/comment_share.json',param,function(result){
    console.log(result);
    var html='';
    var vote='';
    var up_pic='';
    var cook_style='';
    var listVote='';
    var subList='';
    var data=result.data;
    if(result.code==0){
        //赞或者cai
        if(data.voteType=='down'){
            vote+=`
            <img src="images/unlike.png" alt="">
            `;
        }else if(data.voteType=='up'){
            vote+=`
            <img src="images/public/user_like.png" alt="">
            `;
        }
        //多张上传图片
        var commentPicUrl=data.commentPicUrl.split(',');

        for(var k=0;k<commentPicUrl.length;k++){
            up_pic+=`
                <div class="personage_upload_pic_box">
                    <img src="${commentPicUrl[k]}" alt="">
                </div>            
            `;
        }
        //多个菜系
        var cook_style_length=data.typeSeedNames.split(',');
        for(var b=0;b<cook_style_length.length;b++){
            cook_style+=`
            <span class="cook_style">${cook_style_length[b]}</span>
            `;
        }

        //点赞人数总计
        var listvote_length=data.listVote;
        for(var a=0;a<listvote_length.length;a++){
            listVote+=`
            <div class="comment_person_pic f-l">
               <img src="${listvote_length[a].headUrls}" alt="">
            </div>
            `;
        }

        // 二级评论数据集
        var subList_length_aa=data.subList;
        console.log(subList_length_aa)
        //限制条数
        var subList_length = subList_length_aa;
        if(subList_length_aa.length>4){
            subList_length=subList_length_aa.slice(0,4);
        }else if(subList_length_aa.length==0){
            $('.comment_container').hide();
        }
        for(var q=0;q<subList_length.length;q++){

            var userIdAT=subList_length[q].userIdAt;
            console.log(userIdAT);
            if(userIdAT==0){
                subList+=`
                            <div class="box">
                                <div class="comment_content_pic">
                                    <img src="${subList_length[q].headUrls}" alt="">
                                </div>
                                <div class="comment_text">
                                    <div class="box j_c_s_b">
                                        <div class="comment_text_one">
                                            <div class="comment_name f-l">
                                                ${subList_length[q].nickName}
                                            </div>
                                            <div class="comment_time f-r">
                                                ${subList_length[q].createTime}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="box">
                                        <div class="comment_wenben">
                                              ${subList_length[q].commentSub}
                                        </div>                                    
                                    </div>  
                                </div>
                            </div>  
                    `;
            }else{
                subList+=`
                            <div class="box">
                                <div class="comment_content_pic">
                                    <img src="${subList_length[q].headUrls}" alt="">
                                </div>
                                <div class="comment_text">
                                    <div class="box j_c_s_b">
                                        <div class="comment_text_one">
                                            <div class="comment_name f-l">
                                                ${subList_length[q].nickName}
                                            </div>
                                            <div class="comment_time f-r">
                                                ${subList_length[q].createTime}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="box">
                                        <div class="comment_wenben">
                                            <span>@${subList_length[q].nickNameAt}</span>  ${subList_length[q].commentSub}
                                        </div>                                    
                                    </div>  
                                </div>
                            </div>                          
                    `;
            }
        }

        //判断点赞条数 和评论条数
        function sss(data){
            if(data.subList==0){
                return '';
            }else{
            return `
           <!-- 用户评论 start -->
            <div class="comment_container">
            <!-- 点赞人数 start-->
                <div class="comment_all box">
                    <div class="comment_like">
                    </div>
                    <div class="comment_personage clear-f">
                        ${listVote}
                    </div>
                </div>
            <!-- 点赞人数 end-->
            </div>
            <!-- 用户评论 end -->    
    `;
            }
        }
        function aaa(data){
            if(data.subList==0){
                return '';
            }else{
                return `
            <!-- 其他用户评论 start -->
            <div class="comment_details">
                <div class="box">
                    <div class="comment_comment"></div>
                    <div class="comment_content">
                          ${subList}
                    </div>
                </div>
            </div>
            <!-- 其他用户评论 end -->                
                `;
            }
        }
        var aaa_=aaa(data);
        var sss_=sss(data);
        html+=`
            <div class="personage_container">
                <!--个人信息 start-->
                <div class="personage_manage box j_c_s_b">
                <div class="box">
                    <div class="personage_pic">
                        <img src="${data.headUrls}" alt="">
                    </div>
                    <div class="personage_click">
                        <div class="personage_click_manage">
                            <span>${data.nickName}</span>
                            <span class="personage_like">
                            ${vote}
                        </span>
                        </div>
                        <div class="personage_address">
                            ${data.cityName}
                        </div>
                    </div>
                </div>
                <div class="box personage_min">
                    ${data.createTime}
                </div>
            </div>
                <!--个人信息 end-->
                <!--上传图片 start-->
                <div class="personage_upload_pic clear-f">
                ${up_pic}
                                
            </div>
                <!--上传图片 end-->
            <!-- 餐厅详情 start-->
            <div class="restaurant_details clear-f">
                <div class="restaurant_pic f-l">
                    <img src="${data.picture}" alt="">
                </div>
                <div class="restaurant_content f-l">
                    <div class="restaurant_address">
                        ${data.restaurantName}
                    </div>
                    <div class="restaurant_series">
                        <span class="restaurant_weizhi">${data.districtName}</span>
                        ${cook_style}
                    </div>
                    <div class="restaurant_distance">
                        <span class="restaurant_juli">距离</span>
                        ${data.distances}
                    </div>
                </div>
            </div>
            <!-- 餐厅详情 end-->
            <!-- 用户操作 start -->
            <div class="user_operation clear-f">
                <!--<div class="f-l">-->
                    <!--浏览 <i>68</i>次-->
                <!--</div>-->
                <div class="f-r">
                    <div>
                        <span class="user_like"></span>
                        <span class="user_comment"></span>
                        <span class="user_delete"></span>
                    </div>
                </div>
            </div>
            <!-- 用户操作 end -->
          </div>  
            ${sss_}
            ${aaa_}
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
    }else{
        alert(result.code);
    }
    $('.container').html(html);

})