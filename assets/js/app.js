/*
* @Author: ZHC
* @Date:   2017-10-28 21:16:26
* @Last Modified by:   ZHC
* @Last Modified time: 2017-10-28 21:18:07
*/
var $$ = mdui.JQ;

$$(function () {
  // appbar 自动隐藏
  var $appbar = $$('.mdui-appbar');
  $$(window).on('scroll', function () {
    $appbar[document.body.scrollTop === 0 ? 'addClass' : 'removeClass']('mdui-shadow-0');
  });
});

var scroll = new SmoothScroll('[data-easing="linear"]', {easing: 'linear'});

var wechatQrcode = $('.follow-us-wechat-official-qrcode');
$('.follow-us-social-item.wechat').hover(function() {
		wechatQrcode.show();
}, function() {
		wechatQrcode.hide();
});