/**
 * Created by Ritesh on 4/16/2016.
 */
//Common namespace for common function(s)

var COMMON = {};
COMMON.UTIL = {

    getRootWebSitePath : function() {
        return (getRootWebSitePath());
    }


}
COMMON.NAME={
    HOME:'home',
    CHECKOUT:'checkout',
    DETAIL:"detail"
}
COMMON.PATH={
    HOME:'/view/productGrid/productGrid.html',
    CHECKOUT:'/view/checkout/checkout.html',
    DETAIL:'/view/details/detail.html'
}
/*get the root path */
function getRootWebSitePath() {

    var _location = document.location.toString();
    var applicationNameIndex = _location.indexOf('/', _location.indexOf('://') + 3);
    var applicationName = _location.substring(0, applicationNameIndex) + '/';
    var webFolderIndex = _location.indexOf('/', _location.indexOf(applicationName) + applicationName.length);
    var webFolderFullPath = _location.substring(0, webFolderIndex);

    return webFolderFullPath;
};
