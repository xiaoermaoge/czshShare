var channelId;

function channelId(channelId) {
    var reg = new RegExp("(^|&)" + channelId + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

channelId = channelId('channelId');

var areaCode;

function areaCode(areaCode) {
    var reg = new RegExp("(^|&)" + areaCode + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

areaCode = areaCode('areaCode');

var pagesize;

function pagesize(pagesize) {
    var reg = new RegExp("(^|&)" + pagesize + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

pagesize = pagesize('pagesize');

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

var epage;

function epage(epage) {
    var reg = new RegExp("(^|&)" + epage + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

epage = epage('epage');

var param = {
    'channelId': channelId,
    'areaCode': areaCode,
    'pagesize': pagesize,
    'longitude': longitude,
    'latitude': latitude,
    'targetType': 'restaurant_detail',
    'epage': epage
}
$.post(address + '/share/moods_share.json', param, function (result) {
    var data = result.data;
    var html = '';
    var list = '';
    var jiu = '';
    var typeSeedNames = '';
    if (result.code == 0) {
        //限制条数
        if (data.length > 4) {
            data = data.slice(0, 4);
        }

        for (var i = 0; i < data.length; i++) {

            //判断有没有酒
            jiu = '';
            var jiu_state = data[i].restList.isWineForbid;
            if (jiu_state == 0) {
                jiu += `
                <span class="restaurant_liquor">无酒</span>
                `;
            } else {
                jiu += ``;
            }

            //循环 二级菜系名称
            var _typeSeedNames_length = data[i].restList.typeSeedNames;
            if (_typeSeedNames_length == null || _typeSeedNames_length == '') {
                return ``;
            } else {
                var typeSeedNames_length = data[i].restList.typeSeedNames.split(',');
                for (var k = 0; k < typeSeedNames_length.length; k++) {
                    typeSeedNames += `
                <span>${typeSeedNames_length[k]}</span>
                `;
                }
            }

            // 设置缺省图片
            if (data[i].itemImgUrl == null || data[i].itemImgUrl == '') {
                data[i].itemImgUrl = 'images/public/11@2x.png'
            }
            list += `
        <div class="special_list">
            <div class="special_pic">
                <img src="${data[i].itemImgUrl}" alt="">
                <div class="restaurant_collect">
                    收藏(<i>${data[i].restList.collectCount}</i>)
                </div>
            </div>
            <div class="special_restaurant box">
                <div class="restaurant_details_left">
                    <div>
                        <span class="restaurant_name">
                            ${data[i].restList.restaurantName}
                            ${jiu}
                        </span>
                    </div>
                    <div class="restaurant_label">
                        ${typeSeedNames}
                    </div>
                    <div class="restaurant_address">
                        <span>${data[i].restList.districtName}</span>
                        <span class="restaurant_xian"></span>
                        <span class="restaurant_distance">${data[i].restList.distances}</span>
                    </div>
                </div>
                <div class="restaurant_details_right">
                    <div class="restaurant_user_sta">
                        <div class="restaurant_like_count clear-f">
                            <div class="restaurant_like_count_pic f-l"></div>
                            <div class="f-l restaurant_like_num">
                                ${data[i].restList.goodCount}
                            </div>
                        </div>
                        <div class="restaurant_vote clear-f">
                            <div class="f-l restaurant_vote_pic"></div>
                            <div>
                                ${data[i].restList.sunCount}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>            
            `;

        }

        html += `
    <div class="special_container">
        <div class="special_title">
            共推荐<i>${result.recordCount}</i>家餐厅
        </div>
        ${list}
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
    } else {
        alert(result.msg);
    }

    $('.contaoner').html(html);
})