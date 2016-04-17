/**
 * Created by Ritesh on 4/15/2016.
 */
acmeApp.directive('dirProductItem',function(){
    return{
        restrict: 'E',
        scope:{
            directiveScope:'=data',
            updateShortlistArray:'&',
            updateAddToCartArray:'&'
        },
        templateUrl:'template/productItem.html',
        link:function($scope, elem, attrs, ctrl){
            $scope.updateShortlist = function(product,isShortlisted){

                product.isSortlisted=isShortlisted;
                $scope.updateShortlistArray({item: product,isShortlisted:isShortlisted});
            };
            $scope.updateCart=function(product,isAdd){

                product.isAddedtocart=isAdd;
                $scope.updateAddToCartArray({item: product,isAddTocart:isAdd});
            }

        }
    }
})
    .directive('appHeader',function()
    {
        return{
            restrict:'E',

            scope:{
                corpName:"=name",
                headerCategorie:'=headerCategories',
                shortlistCount:'=shortlistCount',
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

                    }
                )
            }

        }
    })
