/**
 * Created by Ritesh on 4/16/2016.
 */
'use strict';

angular.module('acmeApp')
    .controller('detailCntrl',function($scope,_productdata,selectedDetailsProduct,$uibModalInstance) {

        $scope.quantity=1;
        $scope.selectedDetailsProduct=selectedDetailsProduct;


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
        $scope.placeOrder=function(){
            $scope.selectedDetailsProduct.quantity=$scope.quantity;
            $scope.selectedDetailsProduct.isAddedtocart=true;
            $uibModalInstance.close( $scope.selectedDetailsProduct);
        }
    })
