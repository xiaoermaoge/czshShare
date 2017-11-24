/**
 * Created by Administrator on 2017/7/18 0018.
 */


//当前城市区号
var areaCode;

function areaCode(areaCode) {
    var reg = new RegExp("(^|&)" + areaCode + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

areaCode = areaCode('areaCode');

//纬度
var latitude;

function latitude(latitude) {
    var reg = new RegExp("(^|&)" + latitude + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

latitude = latitude('latitude');

//经度
var longitude;

function longitude(longitude) {
    var reg = new RegExp("(^|&)" + longitude + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

longitude = longitude('longitude');

//餐厅id
var restaurantId;

function restaurantId(restaurantId) {
    var reg = new RegExp("(^|&)" + restaurantId + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

restaurantId = restaurantId('restaurantId');

//用户userId
var userId;

function userId(userId) {
    var reg = new RegExp("(^|&)" + userId + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

userId = userId('userId');

var param = {
    'areaCode': areaCode,
    'latitude': latitude,
    'longitude': longitude,
    'restaurantId': restaurantId,
    'userId': userId
}
//餐厅分享
$.post(address + '/share/rest_message_share.json', param, function (result) {
    var html = '';
    var data = result.data;
    var picUrlBanner = '';
    var isJiu = '';
    var typeTowName = '';
    var restaurant_message = '';
    var restaurant_record = '';
    var restaurant_concat = '';
    if (result.code == 0) {
        //遍历banner 图片
        var picUrl_ = data.picUrl;

        //缺省 图片
        if (picUrl_ == null || picUrl_ == '') {
            picUrlBanner += `
             <div class="swiper-slide">
               <img src="images/public/3@2x.png" alt=""/>
             </div>            
            `;
        } else {
            var picUrl = picUrl_.split(',');
            for (var i = 0; i < picUrl.length; i++) {
                picUrlBanner += `
                 <div class="swiper-slide">
                   <img src="${picUrl[i]}" alt=""/>
                 </div>
            `;
            }
        }

        //赞或踩
        var vote = data.userVote.voteType;
        if (vote == 'up') {
            $('.restaurant_like_pic img').attr('src', 'images/public/haveLike.png');
        } else if (vote == 'down') {
            $('.restaurant_unlike_pic img').attr('src', 'images/public/have_down.png');
        }
        //有无酒
        var jiu = data.isWineForbid;
        if (jiu == 1) {
            isJiu += `
            <span class="restaurant_liquor">无酒</span>
            `;
        } else {
            isJiu = '';
        }

        //二级菜系名称
        var typeSeedNames = data.typeSeedNames.split(',');
        for (var k = 0; k < typeSeedNames.length; k++) {
            typeTowName += `
            <span>${typeSeedNames[k]}</span>
            `;
        }

        <!-- 餐厅信息 start-->
        restaurant_message += `
            <div class="box">
                <div class="restaurant_details_left">
                    <div>
                        <span class="restaurant_name">
                            ${data.restaurantName}
                            ${isJiu}
                        </span>
                    </div>
                    <div class="restaurant_label">
                        ${typeTowName}
                    </div>
                    <div class="restaurant_address">
                        <span>${data.districtName}</span>
                        <span class="restaurant_xian"></span>
                        <span class="restaurant_distance">${data.distances}</span>
                    </div>
                </div>
                <div class="restaurant_details_right">
                    <div class="restaurant_user_sta">
                        <div class="restaurant_like_count clear-f">
                            <div class="restaurant_like_count_pic f-l"></div>
                            <div class="f-l restaurant_like_num">
                                ${data.goodCount}
                            </div>
                        </div>
                        <div class="restaurant_vote clear-f">
                            <div class="f-l restaurant_vote_pic"></div>
                            <div>
                                ${data.sunCount}
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
        `;
        <!-- 餐厅信息 end-->

        <!-- 餐厅记录 start -->
        restaurant_record += `
            <div class="f-l box a_i_c j_c_c">
                <div class="user_come"></div>
                <div>谁来过(<i>${data.reachCount}</i>)</div>
            </div>
            <div class="f-l box a_i_c j_c_c">
                <div class="user_who_like"></div>
                <div>谁喜欢(<i>${data.collectCount}</i>)</div>
            </div>
            <div class="f-l box a_i_c j_c_c">
                <div class="user_collect"></div>
                <div>谁收藏(<i>${data.treasure}</i>)</div>
            </div>        
        `;
        <!-- 餐厅记录 end -->

        //营业时间
        function getTime(data) {
            var timeMore = '';
            var timeLast = '';

            var _bizDayAndHours = data.bizDayAndHours;
            var phone = data.bizPhone;
            // console.log(phone);
            //拨打电话
            var phoneContainer = '';
            if (phone == null || phone == '') {
                phoneContainer = '';
            } else {
                var _phone = data.bizPhone.split(',');
                var this_phone = '';
                // console.log(_phone);
                for (var p = 0; p < _phone.length; p++) {
                    // console.log(_phone.length)
                    this_phone += `
                    <a href="tel: ${_phone[p]}">${_phone[p]}</a>
                `;

                }
                phoneContainer += `
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

            if (_bizDayAndHours == null || _bizDayAndHours == '') {
                return `
            <div class="bg_fa"></div>
            <div class="restaurant_concat_address clear-f">
                <div class="restaurant_concat_left f-l"></div>
                <div class="restaurant_concat_right f-l ">
                    <div class="box a_i_c">
                        <div class="restaurant_concat_name">
                            ${data.address}
                        </div>
                        <div class="restaurant_concat_tel" data-click="showModal">
                            ${phoneContainer}
                        </div>
                    </div>
                </div>
            </div>                
                `;
            } else {
                var bizDayAndHours = data.bizDayAndHours.split(',');
                if (bizDayAndHours == null) {
                    return '';
                } else {
                    console.log(bizDayAndHours);

                    if (bizDayAndHours.length > 1) {

                        for (var tt = 0; tt < bizDayAndHours.length; tt++) {
                            var rq = bizDayAndHours[tt].indexOf(' ');
                            var rq_ = bizDayAndHours[tt].substring(0, rq);
                            var sj = bizDayAndHours[tt].substring(rq);
                            if (sj == ' ：00:00-23:59' || sj == ' ：00:00-24:00') {
                                sj = '全天24小时'
                            }
                            timeLast += `
                    <div class="restaurant_time_list">
                        <span class="dot"></span>
                        <span>${rq_}</span>
                        <span>${sj}</span>
                    </div>                    
                    `;

                        }
                        timeMore += `
            <!-- 多营业时间段 start -->
            <div class="restaurant_concat_time clear-f">
                <div class="f-l restaurant_time_left"></div>
                <div class="f-l restaurant_time_right">
                    <div class="restaurant_time_right_title">
                        该商家有多个营业时间段
                    </div>
                    ${timeLast}
                </div>
            </div>
            <!-- 多营业时间段 end -->                
                `;
                    } else if (bizDayAndHours.length == 1) {
                        var rq = bizDayAndHours[0].indexOf(' ');
                        var rq_ = bizDayAndHours[0].substring(0, rq);
                        var sj = bizDayAndHours[0].substring(rq);
                        if (sj == ' ：00:00-23:59' || sj == ' ：00:00-24:00') {
                            sj = '全天24小时'
                        }
                        timeMore += `
 <!--单营业时间 start-->
            <div class="restaurant_concat_time dan clear-f">
                <div class="f-l restaurant_time_left"></div>
                <div class="f-l restaurant_time_right">
                    <div class="restaurant_time_list">
                        <span>${rq_}</span>
                        <span>${sj}</span>
                    </div>
                </div>
            </div>
            <!--单营业时间 end-->                 
                `;
                    }
                }
            }
            return `
            <div class="bg_fa"></div>
            <div class="restaurant_concat_address clear-f">
                <div class="restaurant_concat_left f-l"></div>
                <div class="restaurant_concat_right f-l ">
                    <div class="box a_i_c">
                        <div class="restaurant_concat_name">
                            ${data.address}
                        </div>
                        <div class="restaurant_concat_tel" data-click="showModal">
                            ${phoneContainer}
                        </div>
                    </div>
                </div>
            </div>
            
            ${timeMore}
                      
            `;
        }

        //多营业时间

        restaurant_concat = getTime(data);
    }
    $('.swiper-wrapper').html(picUrlBanner);
    $('.restaurant_message').html(restaurant_message);
    $('.restaurant_record').html(restaurant_record);
    $('.restaurant_concat').html(restaurant_concat);

    //切换 电话模态框
    var phonedata = {
        showModal: function showModal(event) {
            $('.restaurant_tel').show();
            if (!data.bizPhone) {
                alert('该餐厅展示没有联系方式!');
            }
        },
        hideModal: function hideModal(event) {
            event.stopPropagation();
            $('.restaurant_tel').hide();
        }
    }
    $('.restaurant_concat_address').on('touchend', "[data-click]", function (e) {
        phonedata[$(this).attr("data-click")](e ? e : window.event)
    });

    //banner 轮播 切换
    var mySwiper = new Swiper('.swiper-container', {
        // autoplay:3000,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        paginationType: 'fraction'
    })
    $('title').html(data.restaurantName);
})


//epage 当前页
var epage;

function epage(epage) {
    var reg = new RegExp("(^|&)" + epage + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

epage = epage('epage');

//epage 当前页
var pagesize;

function pagesize(pagesize) {
    var reg = new RegExp("(^|&)" + pagesize + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

pagesize = pagesize('pagesize');
var params = {
    'restaurantId': restaurantId,
    'type': 1,
    'userId': userId,
    'pagesize': pagesize,
    'epage': epage
}
//点评详情
$.post(address + '/comment/get_comment_list_message.json', params, function (resulCtomment) {
    var restaurant_comment = '';
    var comment_details_container = '';
    var feel = '';
    var feel_pic = '';
    var feel_pic_person = '';
    var data = resulCtomment.data;
    var voteCount = '';
    var person_count = '';
    for (var i = 0; i < data.length; i++) {
        //自己赞或踩
        feel = '';

        if (data[i].voteType == 'up') {
            feel += `
                <img src="images/public/person_like.png" alt="">
            `;

        } else if (data[i].voteType == 'down') {
            feel += `
                <img src="images/unlike.png" alt="">
            `;
        } else {
            feel = '';
        }
        //上传图片
        var commentPicUrlList = data[i].commentPicUrlList;
        feel_pic = '';
        for (var k = 0; k < commentPicUrlList.length; k++) {
            if (commentPicUrlList[k].picUrl == null || commentPicUrlList[k].picUrl == '') {
                commentPicUrlList[k].picUrl = 'images/public/12@2x.png'
            }
            feel_pic += `
                            <div class="comment_pic_list f-l">
                                <img src="${commentPicUrlList[k].picUrl}" alt="">
                            </div>            
            `;
        }
        //判断评论自己赞 下方的图标高亮
        var userVote = data[i].userVote;
        feel_pic_person = '';

        if (userVote == 0) {
            feel_pic_person += `
                                    <div class="comment_like_dian">
                                        <img src="images/public/user_like.png" alt="">
                                    </div>
                                    <div class="comment_like_count" style="color: #333">
                                        ${data[i].voteCount}
                                    </div>
                                    <div class="comment_like_content">
                                        <img src="images/public/user_comment.png" alt="">
                                    </div>
                                    <div class="comment_like_content_count">
                                        ${data[i].subCount}
                                    </div>               
            `;
        } else if (userVote == 1) {
            feel_pic_person += `
                                    <div class="comment_like_dian">
                                        <img src="images/public/person_like.png" alt="">
                                    </div>
                                    <div class="comment_like_count" style="color: #ffb32d">
                                        ${data[i].voteCount}
                                    </div>
                                    <div class="comment_like_content">
                                        <img src="images/public/user_comment.png" alt="">
                                    </div>
                                    <div class="comment_like_content_count">
                                        ${data[i].subCount}
                                    </div>            
            `;
        }
        //点评人数
        var listVote = data[i].listVote;
        person_count = '';
        for (var a = 0; a < listVote.length; a++) {

            if (listVote.length - 1 == a) {
                person_count += `
                     <span>${listVote[a].nickName}</span>            
            `;
            } else {
                person_count += `
                     <span>${listVote[a].nickName}、</span>            
            `;
            }
        }


        //处理没有人评论
        function ss(length, person_count) {
            if (length == 0) return ''
            else {
                return `
            <div class="comment_two" >
                    <div class="comment_two_person box">
                    <div class="comment_user_like"></div>
                    <div class="comment_user_person">
                    ${person_count}
                    </div>
                    </div>
                    </div>`
            }
        }

        //二级评论
        function sss_(data) {
            var at = '';

            if (!data.userIdAt == null || data.userIdAt == 0) {
                at = '';
            } else {
                at += `
                <span>@${data.nickNameAt}</span>
                `;
            }

            return `
 
                        
                                <div class="comment_list_discuss">
                                    <div class="clear-f">
                                        <div class="f-l comment_two_name">${data.nickName}</div>
                                        <div class="f-r comment_two_time_one">${data.createTime}</div>
                                    </div>
                                    <div class="comment_discuss">
                                        ${at} ${data.commentSub}
                                    </div>
                                </div>                                 
            `;
        }

        var subList_ = data[i].subList;

        function second_comment(data) {

            var sub_ = "";
            for (var b = 0; b < data.length; b++) {
                sub_ += sss_(data[b]);
            }
            return sub_;
        }

        var second_comment_ = second_comment(data[i].subList);
        var person_count_ = ss(listVote.length, person_count);

        //没有评论
        function no_comment_(data) {
            if (data.length == 0) {
                return '';
            } else {
                return `
                        <div class="comment_two_details clear-f">
                            <div class="f-l comment_two_details_comment"></div>
                            <div class="f-l comment_two_details_list">
                                
                                ${second_comment_}
                            </div>
                        </div>                
                `;
            }
        }

        if (data[i].headUrls == null || data[i].headUrls == '') {
            data[i].headUrls = 'images/public/sex_unknown.png';
        }

        var no_comment = no_comment_(data[i].subList);
        if (data[i].headUrls == null || data[i].headUrls == '') {
            data[i].headUrls = 'images/public/sex_unknown.png';
            if (data[i].sex == 1) {
                data[i].headUrls = 'images/public/1man.png';
            }
            if (data[i].sex == 2) {
                data[i].headUrls = 'images/public/1woman.png';
            } else {
                data[i].headUrls = 'images/public/1sex_unknown.png';
            }
        }
        comment_details_container += `
                <div class="comment_details">
                    <div class="comment_person">
                        <div class="personage_manage box j_c_s_b">
                            <div class="box">
                                <div class="personage_pic">
                                    <img src="${data[i].headUrls}" alt="">
                                </div>
                                <div class="personage_click">
                                    <div class="personage_click_manage">
                                        <span>${data[i].nickName}</span>
                                        <span class="personage_like">
                                           ${feel}
                        </span>
                                    </div>
                                    <div class="personage_address">
                                        ${data[i].cityName}
                                    </div>
                                </div>
                            </div>
                            <div class="box personage_min">
                                ${data[i].createTime}
                            </div>
                        </div>
                        <div class="comment_text">
                            ${data[i].comment}
                        </div>
                        <div class="comment_pic clear-f">
                            ${feel_pic}
                        </div>
                        <div class="comment_like clear-f">
                            <div class="f-r">
                                <div class="box a_i_c j_c_c">
                                    ${feel_pic_person}
                                </div>
                            </div>
                        </div>
                        ${person_count_}
                                                
                        ${no_comment}
                        
                        
                        
                        

                    </div>

                </div>        
        `;
    }
    if (resulCtomment.code == 0) {
        restaurant_comment += `
            <div class="bg_fa"></div>
            <div class="comment_title">
                网友点评(<span>${resulCtomment.recordCount}</span>)
            </div>
            ${comment_details_container}
               
        `;
    }
    $('.restaurant_comment').html(restaurant_comment);
})