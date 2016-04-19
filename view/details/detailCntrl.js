/**
 * This controller is open as modal popup and use for:-
 * 1. Provide the detailed view of selected  Item
 * 2. User can add/delete the quantity of the item
 * 3. Can Add the item in cart and continue for shopping
 * ===================================================
 * TODO:
 * Shoe the zoom image on hover on product image
 * ===================================================
 */
'use strict';

angular.module('acmeApp')
    .controller('detailCntrl',function($scope,_productdata,selectedDetailsProduct,$uibModalInstance) {

        //Quantity of product
        $scope.quantity=selectedDetailsProduct.quantity;
        $scope.selectedDetailsProduct=selectedDetailsProduct;

        //update the quantity of selected Item
        $scope.updateCartItem=function(count){

            if(count==1)
            {
                $scope.quantity+=count;
            }
            else if($scope.quantity>1)
            {
                $scope.quantity+=count
            }
        };
        //FUNCTION: Add the item in cart and continue the shopping
        $scope.addCard_ContinueShopping=function(){
            $scope.selectedDetailsProduct.quantity=$scope.quantity;
            $scope.selectedDetailsProduct.isAddedtocart=true;
            //Call back to parent page
            $uibModalInstance.close( $scope.selectedDetailsProduct);
        }
    })
