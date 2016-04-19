/**
 * Created by Ritesh
 * contains following directives
 * 1. dirProductItem: directive for product Item
 * 2. appHeader: directive for application header
 */

/*
* dirProductItem: directive
* -create the product item
* -used 'productItem' page as template URL
* -provide following functionality:
*   --DETAIL CLICK FUNCTION: for open the detail popup
*   --SHORTLIST CLICK FUNCTION: add/remove the item from shortlist
*   --ADD TO CART FUNCTION: add/remove the item from cart
* */
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
                headerCategories:'=headerCategories',
                shortlistCount:'=shortlistCount',
                autoCompleteData:'=',
                change:'&onchangFilter',
                cartCount:"=cartCount",
                totalBeforeDiscount:'=totalBeforeDiscount',
                total1AfterDiscount:'=totalAfterDiscount',
                shoppingCart:'=shoppingCart',
                placeOrderClick:"&onPlaceOrderClick",
                fliterShortlistedData:'&fliterShortlistedGridData'
            },


            templateUrl:'template/header.html',

            link:function($scope, elem, attrs, ctrl){

                $scope.fliterShortlist=function(){

                    $scope.fliterShortlistedData();
                }
                $scope.filterGrid=function(categoryId){
                    $scope.change({newValueId: categoryId,isTypeId:true});
                }

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
                            //debugger;
                            $scope.change({newValueId: newValue.originalObject.id,isTypeId:false});
                        }
                        else{
                            $scope.change({newValue: null});
                        }

                    }
                )
            }

        }
    })
