
//Common namespace for common function(s)
//Used to create  common function for the application
var COMMON = {};
COMMON.UTIL = {

    getRootWebSitePath : function() {
        return (getRootWebSitePath());
    }


}
//page Name
COMMON.NAME={
    PRODUCT_GRID:'productGrid',
    CHECKOUT:'checkout',
    DETAIL:"detail",
    ADMIN:'admin'
}
//Page Path
COMMON.PATH={
    PRODUCT_GRID:'/view/productGrid/productGrid.html',
    CHECKOUT:'/view/checkout/checkout.html',
    DETAIL:'/view/details/detail.html',
    ADMIN:'/view/admin/admin.html'
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
