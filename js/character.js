"use strict";

var targetUrl;
function targetUrl(targetUrl) {
    var reg = new RegExp("(^|&)" + targetUrl + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);return null;
}
targetUrl = targetUrl('targetUrl');
$.post(address+'/share/article_share.json', { 'targetUrl': targetUrl }, function (result) {
    console.log(result);
    var html = '';
    var data = result.data;
    if (result.code == 0) {
        if (data.coverImgUrl == null || data.coverImgUrl == '') {
            data.coverImgUrl = 'images/public/placeholder_default_image.png';
        }

        html += "\n        <div class=\"character_pic\">\n            <img src=\"" + data.coverImgUrl + "\" alt=\"\">\n        </div>\n        <div class=\"character_introduce\">\n            <div class=\"character_name\" "+(data.articleTitle?"":'style=display: none')+">\n                " + data.articleTitle + "\n            </div>\n            <div class=\"character_data\" "+(data.articleTitleSub?"":"style=display: none")+">\n                <span>" + data.articleTitleSub + "</span>\n            </div>\n            <div class=\"character_experience\">\n                <div class=\"character_zhaiyao\" "+(data.summary?'':'style=\"display: none\"')+" >\n                    " + (data.summary?data.summary:'') + "\n                </div>\n               <div class=\"character_text_container\">\n                   <div class=\"character_text\">\n                       " + data.content + "\n                   </div>\n               </div>\n            </div>\n        </div>            \n        ";
        console.log(html)
    } else {
        alert(result.msg);
    }
    $('.container').html(html);
});

var u = navigator.userAgent;
if(u.indexOf('purelife')>0){
    $('.footer_ico').hide();
}else{
    $('.footer_ico').show();
}
