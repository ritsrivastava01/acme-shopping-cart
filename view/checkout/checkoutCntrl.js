
'use strict';


angular.module('acmeApp')



    .controller('checkoutCntrl',['$scope','_productdata',function($scope,_productdata){
        $scope.getTotalAmount=function(){
            $scope.totalAmount=0;
            angular.forEach(cartData,function(val,index){

                $scope.totalAmount+=val.quantity*val.priceNew;
            })
        }
        var cartData=_productdata.getArrAddToCartItem();
        $scope.shoppingCart=cartData;
        $scope.getTotalAmount();
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
                _productdata.updateAddtoCartCount(objProduct);
                $scope.getTotalAmount();
        };
        $scope.removeFromCart=function(objIteml){
           // debugger;
            _productdata.updateArrAddToCartItem(objIteml);
            $scope.getTotalAmount();
        }
    $scope.finalPayment=function(){

    }

    }])

