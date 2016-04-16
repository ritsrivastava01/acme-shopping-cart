/**
 * Created by Ritesh on 4/15/2016.
 */
acmeApp.directive('dirProductItem',function(){
    return{
        restrict: 'E',
        scope:{
          directiveScope:'=data'
        },
        templateUrl:'template/productItem.html'
    }
})
    .directive('appHeader',function()
    {
        return{
            restrict:'E',
            templateUrl:'template/header.html'
        }
    })
