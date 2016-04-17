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
            transclude: true,
            scope:{
                corpName:"=name",
                headerCategorie:'=headerCategories',
                wishlistCount:'=wishlistCount',
                cartCount:"=cartCount",
                change:'&onchangeee'
            },
            templateUrl:'template/header.html',
            link:function($scope, elem, attrs, ctrl){
                $scope.selectedCategory=null;

                $scope.$watch(
                    'selectedCategory',function(newValue, oldValue){



                        if($scope.selectedCategory!=null)
                        {

                            $scope.change({newValue: newValue});
                        }
                        else{

                            $scope.change({newValue: null});
                        }
                        /*debugger;
                        if($scope.selectedCategory!=null)
                            $scope.$emit('refreshGrid',newValue.originalObject);
                        else{
                            $scope.$broadcast('refreshGrid',null);
                        }*/
                    }
                )
            }

        }
    })
