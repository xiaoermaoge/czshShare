/**
 * Created by lyz on 2017/7/20.
 */

var targetUrl;
function targetUrl(targetUrl){
    var reg = new RegExp("(^|&)" + targetUrl + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
targetUrl=targetUrl('targetUrl');

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

var itemName;
function itemName(itemName){
    var reg = new RegExp("(^|&)" + itemName + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
itemName=itemName('itemName');

var itemId;
function itemId(itemId){
    var reg = new RegExp("(^|&)" + itemId + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
itemId=itemId('itemId');

var param={
    'targetUrl':targetUrl,
    'areaCode':areaCode,
    'epage':epage,
    'pagesize':pagesize,
    'longitude':longitude,
    'latitude':latitude,
    'itemId' : itemId

}
$.post(address+'/share/subject_share.json',param,function(result){
    var data=result.data;
    var html='';
    var list='';

    if(result.code==0){
        //判断有没有酒
        for(var i=0;i<data.length;i++){
            //判断有没有酒
            var jiu='';
            var name_list='';
            if(data[i].isWineForbid==0){
                jiu+=``;

                $('.restaurant_liquor').hide();
            }else if(data[i].isWineForbid==1){
                jiu+=`<span class="restaurant_liquor">无酒</span>`;
            }else{
                console.log('不知道');
            }
            //循环 餐厅 小标签
            var _typeSeedNames=data[i].typeName;
            if(_typeSeedNames==null||_typeSeedNames==''){
                return ``;
            }else{
                var typeSeedNames=data[i].typeName.split(',');
                for(var name=0;name<typeSeedNames.length;name++){
                    console.log(name);
                    name_list+= `<span>${typeSeedNames[name]}</span>`;
                }
            }


            if(data[i].picture==null||data[i].picture==''){
                data[i].picture='images/public/11@2x.png';
            }
            list+=`
               <div class="special_list">
                    <div class="special_pic">
                        <img src="`+data[i].picture+`" alt="">
                    </div>
                    <div class="special_restaurant box">
                        <div class="restaurant_details_left">
                            <div>
                                <span class="restaurant_name">
                                    `+data[i].restaurantName +`
                                    `+jiu+`
                                </span>
                            </div>
                            <div class="restaurant_label">
                                ${name_list}
                            </div>
                            <div class="restaurant_address">
                                <span>${data[i].districtName}</span>
                                <span class="restaurant_xian"></span>
                                <span class="restaurant_distance">${data[i].distances}</span>
                            </div>
                         </div>
                        <div class="restaurant_details_right">
                            <div class="restaurant_user_sta">
                                <div class="restaurant_like_count clear-f">
                                    <div class="restaurant_like_count_pic f-l"></div>
                                    <div class="f-l restaurant_like_num">
                                        ${data[i].goodCount}
                                    </div>
                                </div>
                                <div class="restaurant_vote clear-f">
                                    <div class="f-l restaurant_vote_pic"></div>
                                    <div>
                                       ${data[i].sunCount}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    

                </div>
      
            `
        }
        html+=`
        <div class="special_title">
           <i>`+result.recordCount+`</i>家餐厅，<i>`+result.collectCount +`</i>次收藏
        </div>
       `+list+` 
    `;
        $('title').html(result.subjectTitle);
        console.log(result.subjectTitle);

    }else{
        alert(result.msg)
    }


    $('.special_container').html(html);

    //点击关闭 icon
    $('.footer_ico .icon_close').click(function(){
        $('.footer_ico').hide();
    });

})