/**
 * Created by Ritesh on 4/16/2016.
 */
'use strict';

angular.module('acmeApp')
    .controller('productGridCntrl',['$scope','$http','_shoppingCartData','_productdata','$uibModal',function($scope,$http,_shoppingCartData,_productdata,$uibModal){
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
            $("#divAlert").fadeTo(2000, 500).slideUp(300, function(){});
        }
        
        $scope.sortAlphabet=function(isAscending){

            if(isAscending)
            {
                $scope.products.sort(function(a, b){
                    var titleA=a.title.toLowerCase(), titleB=b.title.toLowerCase()
                    if (titleA < titleB) //sort string ascending
                        return -1
                    if (titleA > titleB)
                        return 1
                    return 0 //default return value (no sorting)
                })
            }
            else{
                $scope.products.sort(function(a, b){
                    var titleA=a.title.toLowerCase(), titleB=b.title.toLowerCase()
                    if (titleA > titleB) //sort string ascending
                        return -1
                    if (titleA < titleB)
                        return 1
                    return 0 //default return value (no sorting)
                })
            }
        };
        $scope.openDetailsWindow=function(product)
        {
            $scope.selectedDetailsProduct=product;
            $uibModal.open({
                templateUrl:COMMON.UTIL.getRootWebSitePath()+COMMON.PATH.DETAIL,
                controller: 'detailCntrl',
                windowClass: 'large-Modal',
                resolve :{
                    selectedDetailsProduct: function () {
                        return $scope.selectedDetailsProduct;
                    }
                }
            });
        }

    }])

