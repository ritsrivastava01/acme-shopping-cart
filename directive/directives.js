/**
 * Created by Ritesh on 4/15/2016.
 */
acmeApp.directive('dirProductItem',function(){
    return{
        restrict: 'E',
        scope:{
            directiveScope:'=data',
            updateShortlistArray:'&',
            updateAddToCartArray:'&',
            openDetailsWindow:'&'
        },
        templateUrl:'template/productItem.html',
        link:function($scope, elem, attrs, ctrl){
            $scope.onClickDetailBtn=function(product){
                $scope.openDetailsWindow({product:product});
            };

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

                change:'&onchangFilter',
                cartCount:"=cartCount",
                totalBeforeDiscount:'=totalBeforeDiscount',
                total1AfterDiscount:'=totalAfterDiscount',
                shoppingCart:'=shoppingCart',
                placeOrderClick:"&onPlaceOrderClick",


            },


            templateUrl:'template/header.html',

            link:function($scope, elem, attrs, ctrl){


                $scope.placeOrder=function(){
                    $('#SmallCart').toggle(300);
                        $scope.placeOrderClick();
                }

                $( ".liCrt" ).click(function() {
                    $('#SmallCart').toggle(300);

                });

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
