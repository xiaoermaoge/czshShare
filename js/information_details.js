"use strict";

/**
 * Created by lyz on 2017/7/21.
 */

var targetUrl;

function targetUrl(targetUrl) {
    var reg = new RegExp("(^|&)" + targetUrl + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

targetUrl = targetUrl('targetUrl');
$.post(address + '/share/article_share.json', {'targetUrl': targetUrl}, function (result) {
    var html = '';
    var data = result.data;
    if (result.code == 0) {
        if (data.coverImgUrl == '' || data.coverImgUrl == null) {
            data.coverImgUrl = 'images/public/10@2x.png'
        }
        html += "\n        <div class=\"information_title\">\n            " + data.articleTitle + "\n        </div>\n        <div class=\"information_time\">\n            " + data.createTime + "\n        </div>\n        <div class=\"information_content\">\n            <div class=\"information_pic\">\n                <img src=\"" + data.coverImgUrl + "\" alt=\"\">\n            </div>\n            <div class=\"information_text\">\n               " + data.content + "\n            </div>\n        </div>\n        ";
    }
    $('.information_container').html(html);
});