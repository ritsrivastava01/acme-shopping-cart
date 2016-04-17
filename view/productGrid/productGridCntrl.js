/**
 * Created by Ritesh on 4/16/2016.
 */
'use strict';

//Stripe.setPublishableKey('pk_test_aj305u5jk2uN1hrDQWdH0eyl');
angular.module('acmeApp')
    .controller('productGridCntrl',['$scope','$http','_shoppingCartData',function($scope,$http,_shoppingCartData){
        $scope.hgt=  window.innerHeight-152;
       // var data=_shoppingCartData.getGroupedData()[1];
        $scope.products=_shoppingCartData.getRawData();
        $scope.filterBy="All";

        $scope.refreshProductList=function(selectedObj){
            if(selectedObj!=null){

                $scope.filterBy=selectedObj.category;
                $scope.filterByImage=selectedObj.imgPath;
                $scope.products=_shoppingCartData.getGroupedData()[selectedObj.categoryId];
            }
            else{
                $scope.filterBy="All";
                $scope.products=_shoppingCartData.getRawData();
                $scope.$emit('clrAotuomplet');
            }
        };
        $scope.$on('refreshGrid',function(event,selectedObj){

            $scope.refreshProductList(selectedObj);


        })


    }])

