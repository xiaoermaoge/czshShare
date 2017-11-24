var commentId;

function commentId(commentId) {
    var reg = new RegExp("(^|&)" + commentId + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

commentId = commentId('commentId');

var longitude;

function longitude(longitude) {
    var reg = new RegExp("(^|&)" + longitude + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

longitude = longitude('longitude');

var latitude;

function latitude(latitude) {
    var reg = new RegExp("(^|&)" + latitude + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

latitude = latitude('latitude');

var userId;

function userId(userId) {
    var reg = new RegExp("(^|&)" + userId + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

userId = userId('userId');

var param = {
    'commentId': commentId,
    'longitude': longitude,
    'latitude': latitude,
    'userId': userId
}
$.post(address + '/share/comment_share.json', param, function (result) {
    var data = result.data;
    console.log(data);
    var html = '';
    var vote = '';
    var up_pic = '';
    var cook_style = '';
    if (result.code == 0) {

        //赞或者踩
        if (data.voteType == 'down') {
            vote += `
            <img src="images/unlike.png" alt="">
            `;
        } else if (data.voteType == 'up') {
            vote += `
            <img src="images/public/haveLike.png" alt="">
            `;
        }

        //多张上传图片
        function _up_pic_container(data) {
            if (data == null || data == '') {
                return '';
            } else {

                var _commetnPic = data.split(',');
                for (var k = 0; k < _commetnPic.length; k++) {
                    console.log(_commetnPic);
                    up_pic += `
                <div class="personage_upload_pic_box">
                    <img src="${_commetnPic[k]}" alt="">
                </div>      
            `;
                }
                return `
                <div class="personage_upload_pic clear-f">${up_pic}</div>                    
                    `;

            }
        }

        var up_pic_container = _up_pic_container(data.commentPicUrl);


        //多个菜系
        var cook_style_length = data.typeSeedNames.split(',');
        for (var b = 0; b < cook_style_length.length; b++) {
            cook_style += `
            <span class="cook_style">${cook_style_length[b]}</span>
            `;
        }

        //点赞人数总计
        function listVote_listVote_(data) {
            if (data.length == 0) {
                return '';
            } else {
                var listVote = '';

                for (var a = 0; a < data.length; a++) {
                    //缺省图片点赞人数
                    if (data[a].headUrls == null || data[a].headUrls == '') {
                        if (data[a].sex == 1) {
                            data[a].headUrls = 'images/public/2man.png';
                        }
                        if (data[a].sex == 2) {
                            data[a].headUrls = 'images/public/2woman.png';
                        } else {
                            data[a].headUrls = 'images/public/2sex_unknown.png';
                        }
                    }
                    listVote += `
                    <div class="comment_person_pic f-l">
                        <img src="${data[a].headUrls}" alt="">
                    </div>   
            `;
                }
                return `
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
                `;
            }
        }

        var listVote_container = listVote_listVote_(data.listVote);

        // 二级评论数据集
        var subList = '';

        function sublist_container_(data) {
            if (data.length == 0) {
                return '';
            } else {
                for (var q = 0; q < data.length; q++) {
                    console.log(data);
                    var userIdAT = data[q].userIdAt;
                    if (userIdAT == 0) {
                        subList += `
                            <div class="box">
                                <div class="comment_content_pic">
                                    <img src="${data[q].headUrls}" alt="">
                                </div>
                                <div class="comment_text">
                                    <div class="box j_c_s_b">
                                        <div class="comment_text_one">
                                            <div class="comment_name f-l">
                                                ${data[q].nickName}
                                            </div>
                                            <div class="comment_time f-r">
                                                ${data[q].createTime}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="box">
                                        <div class="comment_wenben">
                                              ${data[q].commentSub}
                                        </div>                                    
                                    </div>  
                                </div>
                            </div>  
                    `;
                    } else {
                        subList += `
                            <div class="box">
                                <div class="comment_content_pic">
                                    <img src="${data[q].headUrls}" alt="">
                                </div>
                                <div class="comment_text">
                                    <div class="box j_c_s_b">
                                        <div class="comment_text_one">
                                            <div class="comment_name f-l">
                                                ${data[q].nickName}
                                            </div>
                                            <div class="comment_time f-r">
                                                ${data[q].createTime}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="box">
                                        <div class="comment_wenben">
                                            <span>@${data[q].nickNameAt}</span>  ${data[q].commentSub}
                                        </div>                                    
                                    </div>  
                                </div>
                            </div>                          
                    `;
                    }
                }
                return `
                            <div class="comment_details">
            <div class="box">
                <div class="comment_comment"></div>
                <div class="comment_content">
                   ${subList} 
                </div>
            </div>
        </div>
                      
                    `;
            }
        }

        var sublist_container = sublist_container_(data.subList);

        //缺省图片餐厅
        if (data.picture == null || data.picture == '') {
            data.picture = 'images/public/19@2x.png';
        }
        //缺省图片 分享人头像
        if (data.headUrls == null || data.headUrls == '') {
            if (data.sex == 1) {
                data.headUrls = 'images/public/1man.png';
            }
            if (data.sex == 2) {
                data.headUrls = 'images/public/1woman.png';
            } else {
                data.headUrls = 'images/public/1sex_unknown.png';
            }
        }

        //设置评论为空
        if (data.comment == '' || data.comment == null) {
            data.comment = ' ';
        }

        html += `
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
            <!-- 评论信息 start -->
            <div class="comment_content">
                ${data.comment}
            </div>
            <!-- 评论信息 end -->
            <!--图片 start-->

            ${up_pic_container} 
            <!--图片 end-->
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
                        <!--<span class="user_delete"></span>-->
                    </div>
                </div>
            </div>
            <!-- 用户操作 end -->
        </div>  
        
        <!-- 用户评论 start -->

        
        ${listVote_container}
        <!-- 用户评论 end -->    
        
        <!-- 其他用户评论 start -->
        ${sublist_container}
        <!-- 其他用户评论 end -->      
        
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
        $('.container').html(html);
        $('title').html(data.restaurantName + '的点评详情!');
    } else {
        alert(result.msg);
    }
})