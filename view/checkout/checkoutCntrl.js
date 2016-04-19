
/*
* this controller is used to perform the following functions:
* 1. Get the user details and Delivery details
* 2. Manage the cart details
*   2.1 User can increase the quantity  of  selected  item
*   2.2 User can remove the selected item from cart
* 3. User can finalize the payment by providing his/her card details
*   ================================================================
* TODO:
 *  1. Validation  on user fields
 *  2. Validate the card details
 *  3. Implement the payment
 *  ===============================================================
* */
'use strict';
angular.module('acmeApp')
    .controller('checkoutCntrl',['$scope','_productdata',function($scope,_productdata){

        //Get the user cart details
        var cartData=_productdata.getArrAddToCartItem();
        $scope.shoppingCart=cartData;

        //Calculate the total amount of cart
        $scope.getTotalAmount=function(){
            $scope.totalAmount=0;
            angular.forEach(cartData,function(val,index){

                $scope.totalAmount+=val.quantity*val.priceNew;
            })
        };

        //FUNCTION: get the total amount
        $scope.getTotalAmount();

        //update the quantity of selected product
            $scope.updateCartItem=function(objProduct,count){

            var quantity=objProduct.quantity;
                if(count==1)
                {
                    objProduct.quantity+=count;
                }
            else if(quantity>1)
            {
                objProduct.quantity+=count
            }
                //update the product data
                _productdata.updateAddtoCartCount(objProduct);
                //Calculate the total amount
                $scope.getTotalAmount();
        };
        //FUNCTION -- to remove the Item from shopping cart
        $scope.removeFromCart=function(objIteml){
           // debugger;
            _productdata.updateArrAddToCartItem(objIteml);
            $scope.getTotalAmount();
        }
        //Function-- Make a final payment
    $scope.finalPayment=function(){
            //TODO: implementation
    }

    }])

