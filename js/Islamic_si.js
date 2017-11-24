
var channelId;
function channelId(channelId){
    var reg = new RegExp("(^|&)" + channelId + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
channelId=channelId('channelId');

var areaCode;
function areaCode(areaCode){
    var reg = new RegExp("(^|&)" + areaCode + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
areaCode=areaCode('areaCode');

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

var param={
    'channelId' : channelId,
    'areaCode' : areaCode,
    'epage' : epage,
    'pagesize' : pagesize,
    'longitude' : longitude,
    'latitude' : latitude,
    'targetType' : 'mosque_detail'
}
$.post(address+'/share/moods_share.json',param,function(result){
    var html='';
    var list='';
    var data=result.data;
    if(result.code==0){
        for(var i=0;i<data.length;i++){
            var pic='';
            // 设置缺省图片
            if(data[i].itemImgUrl==null||data[i].itemImgUrl==''){
                data[i].itemImgUrl='images/public/11@2x.png';
            }else{
            var pic_length=data[i].itemImgUrl.split(',');
            list+=`
            <div class="islamic_list">
                <div class="islamic_img">
                    <img src="${pic_length[0]}" alt="">
                </div>
                <div class="islamic_name">
                    ${data[i].itemName}
                </div>
                <div class="islamic_address clear-f">
                    <div class="f-l address">${data[i].mosqueMessage.address}</div>
                    <div class="f-r address_distance">
                        ${data[i].mosqueMessage.distances}
                    </div>
                </div>
            </div>            
            `;
            }
        }
        html+=`
        <div class="islamic_container">
            <div class="islamic_title">
                ${result.recordCount}家清真寺
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
    }else{
        alert(result.msg);
    }
    $('.container').html(html);
})