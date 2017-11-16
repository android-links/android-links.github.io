/*
* @Author: inferjay
* @Date:   2017-11-16 12:10:18
* @Last Modified by:   inferjay
* @Last Modified time: 2017-11-16 13:00:02
*/
/*
* @Author: inferjay
* @Date:   2017-11-16 11:49:29
* @Last Modified by:   inferjay
* @Last Modified time: 2017-11-16 12:10:28
*/
function showFirstPageAppsList() {
    let params = {
        "package_name": "org.androidlinks.website.appspage",
        "order_type": 1,
        "limit": 100
    };
    let callback = {
        hideLoadingProgress: hideLoadingProgress,
        showLoadingSuccessView: showAppsLoadingSuccessView,
        showLoadingErrorView: showLoadingErrorView
    }
    attemptLoadAppListInfo(url_recommend, params, callback);
}

var showAppsLoadingSuccessView = function(data) {
	checkIsGreenApp(data);
    $("#app-item-templ").tmpl(data).appendTo('.app-item-container');
    $('.app-item-container').removeClass('mdui-hidden');
}

showFirstPageAppsList();