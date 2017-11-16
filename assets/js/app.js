/*
* @Author: inferjay
* @Date:   2017-10-28 21:16:26
* @Last Modified by:   inferjay
* @Last Modified time: 2017-11-16 12:58:54
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

var wechat_qrcode = $('.follow-us-wechat-official-qrcode');
$('.follow-us-social-item.wechat').hover(function() {
		wechat_qrcode.show();
}, function() {
		wechat_qrcode.hide();
});

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

// 邮件订阅功能
var mailchimp_url   = "https://androidlinks.us17.list-manage.com/subscribe/?u=21b7c731d4d2719058edaf040&id=6b25b5980e";
var success_message = "请检查您收件箱并确认邮件";
var msg_params      = {'timeout': 2000, 'position': 'top'};

var attempt_subscibe = function(e) {
    e.preventDefault();
    $('.btn-email-subscibe').attr('disabled', 'disabled');
    var email = $('#email').val();
    if (email != '' && isEmail(email)) {
    	msg_params['message'] = '请稍等...';
        var snackbar = mdui.snackbar(msg_params);
        mailchimp_url = mailchimp_url.replace('?u=', '/post-json?u=').concat('&c=?');
        var data = {};
        data['EMAIL'] = email;
        $.ajax({
            url: mailchimp_url,
            type: "POST",
            data: data,
            dataType: 'jsonp',
            success: function(response, text) {
            	if (snackbar) {
            		snackbar.close();
            	}
                if (response.result === 'success') {
                	msg_params['message'] = success_message;
                    $('#email').val('');
                } else {
                	msg_params['message'] = response.result + ": " + response.msg;
                	msg_params['timeout'] = 4000;
                	$('#email').focus().select();
                }
                mdui.snackbar(msg_params);
                $('.btn-email-subscibe').removeAttr('disabled');
                mdui.updateTextFields('#email')
            },
            error: function(response, text) {
                console.log('mailchimp ajax submit error: ' + text);
                $('.btn-email-subscibe').removeAttr('disabled');
                $('#email').focus().select();
                mdui.updateTextFields('#email');
            }
        });
        return false;
    } else {
    	msg_params['message'] = '请填写正确的邮箱地址';
        mdui.snackbar(msg_params);
        $('.btn-email-subscibe').removeAttr('disabled');
        $('#email').focus().select();
        mdui.updateTextFields('#email');
    }
};

$('.btn-email-subscibe').click(attempt_subscibe);

window.onscroll = function() {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        $('.btn-back-to-top').show();
    } else {
        $('.btn-back-to-top').hide();
    }
}

var backToTop = function () {
   var scroll = new SmoothScroll();
   scroll.animateScroll($('.back-to-top').get(0));
};
$('.btn-back-to-top').click(backToTop);

//********************** 获取已加入计划的 App 列表信息 ********************//
var url_base_api  = "https://recommend.wetolink.com/api/";
var api_version   = "v2";
var url_recommend = url_base_api + api_version + "/app_recommend/pull";

function attemptLoadAppListInfo(url, data, callback) {
    $.ajax({
            url: url,
            type: "GET",
            data: data,
            dataType: 'json',
            success: function(response, text) {
                if (text === 'success') {
                    if (response.data) {
                        callback.hideLoadingProgress();
                        callback.showLoadingSuccessView(response.data);
                    } else {
                        callback.showLoadingErrorView();
                    }
                } else {
                    console.log(response.result + ": " + response.msg);
                    callback.showLoadingErrorView();
                }
            },
            error: function(response, text) {
                console.log('mailchimp ajax submit error: ' + text);
                callback.showLoadingErrorView();
            }
        });
        return false;
}

var hideLoadingProgress = function() {
    $('.app-item-load-container').hide();
}

var showLoadingErrorView = function() {
    $('.load-progress').addClass('mdui-hidden');
    $('.load-error-text').removeClass('mdui-hidden');
}

function checkIsGreenApp(data) {
    let green_apps = [
        {"package_name": "kh.android.dir"},
        {"package_name": "com.drakeet.purewriter"}
    ];
    data.forEach(function(item){
        item.isGreenApp = false;
        green_apps.forEach(function(element){
            if (element.package_name === item.packageName) {
                item.isGreenApp = true;
            }
        });
    });
}
