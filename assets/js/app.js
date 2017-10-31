/*
* @Author: inferjay
* @Date:   2017-10-28 21:16:26
* @Last Modified by:   inferjay
* @Last Modified time: 2017-10-31 23:35:54
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

function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

// 邮件订阅功能
var mailchimp_url = "https://androidlinks.us17.list-manage.com/subscribe/?u=21b7c731d4d2719058edaf040&id=6b25b5980e";
var success_message = "请检查您收件箱并确认邮件";
var msgParams = {'timeout': 2000, 'position': 'top'};

var attemptSubscibe = function(e) {
    e.preventDefault();
    $('.btn-email-subscibe').attr('disabled', 'disabled');
    var email = $('#email').val();
    if (email != '' && IsEmail(email)) {
    	msgParams['message'] = '请稍等...';
        var snackbar = mdui.snackbar(msgParams);
        mailchimp_url = mailchimp_url.replace('?u=', '/post-json?u=').concat('&c=?');
        var data = {};
        data['EMAIL'] = email;
        $.ajax({
            url: mailchimp_url,
            type: "POST",
            data: data,
            dataType: 'json',
            success: function(response, text) {
            	if (snackbar) {
            		snackbar.close();
            	}
                if (response.result === 'success') {
                	msgParams['message'] = success_message;
                    $('#email').val('');
                } else {
                	msgParams['message'] = response.result + ": " + response.msg;
                	msgParams['timeout'] = 4000;
                	$('#email').focus().select();
                }
                mdui.snackbar(msgParams);
                $('.btn-email-subscibe').removeAttr('disabled');
                mdui.updateTextFields('#email')
            },
            dataType: 'jsonp',
            error: function(response, text) {
                console.log('mailchimp ajax submit error: ' + text);
                $('.btn-email-subscibe').removeAttr('disabled');
                $('#email').focus().select();
                mdui.updateTextFields('#email');
            }
        });
        return false;
    } else {
    	msgParams['message'] = '请填写正确的邮箱地址';
        mdui.snackbar(msgParams);
        $('.btn-email-subscibe').removeAttr('disabled');
        $('#email').focus().select();
        mdui.updateTextFields('#email');
    }
};

$('.btn-email-subscibe').click(attemptSubscibe);