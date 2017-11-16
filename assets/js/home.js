/*
* @Author: inferjay
* @Date:   2017-11-16 11:49:29
* @Last Modified by:   inferjay
* @Last Modified time: 2017-11-16 13:02:24
*/
function showHomeAppList() {
    let params = {
        "package_name": "org.androidlinks.website.homepage",
        "limit": 8
    };
    let callback = {
        hideLoadingProgress: hideLoadingProgress,
        showLoadingSuccessView: showHomeLoadingSuccessView,
        showLoadingErrorView: showLoadingErrorView
    }
    attemptLoadAppListInfo(url_recommend, params, callback);
}

var showHomeLoadingSuccessView = function(data) {
	checkIsGreenApp(data);
    data.push({
        "downloadUrl" : "apps.html",
        "appName" : "更多应用",
        "isGreenApp": false,
        "iconUrl" : "assets/images/icon-more-app.svg",
        "description" : "更多加入 Android 应用友链计划的应用，期待更多的个人开发者小伙伴们的加入。"
    })
    $("#app-item-templ").tmpl(data).appendTo('.app-item-container');
    $('.app-item-container').removeClass('mdui-hidden');
}

showHomeAppList();