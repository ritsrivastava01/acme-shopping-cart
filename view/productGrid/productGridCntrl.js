/**
 * Created by Ritesh on 4/16/2016.
 */
'use strict';

//Stripe.setPublishableKey('pk_test_aj305u5jk2uN1hrDQWdH0eyl');
angular.module('acmeApp')
    .controller('productGridCntrl',['$scope','$http','_shoppingCartData','_productdata',function($scope,$http,_shoppingCartData,_productdata){
        $scope.hgt=  window.innerHeight-152;

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
        $scope.updateShortlistArray=function(product,isShortlisted){
            if(isShortlisted)
            {
                $scope.showAlertMessage('alert alert-success',"Wao!","Product added to your shortlist.");
            }
          else
            {
                $scope.showAlertMessage('alert alert-warning',"OOPS!","Product removed from your shortlist.");
            }


            _productdata.updateShortListItem(product);
        }
        $scope.updateAddToCartArray=function(product,isAddTocart){
            if(isAddTocart)
            {
                $scope.showAlertMessage('alert alert-success',"Wao!","Product added to your Cart.");
            }
            else
            {
                $scope.showAlertMessage('alert alert-warning',"OOPS!","Product removed from your Cart.");
            }


            _productdata.updateArrAddToCartItem(product);
        }
        //Show the alert box
        $scope.showAlertMessage=function(cls,message1,message2){
            $scope.alertClass=cls;
            $scope.alertMsg1=message1;
            $scope.alertMsg2=message2;
            $("#divAlert").fadeTo(2000, 500).slideUp(500, function(){});
        }


    }])

