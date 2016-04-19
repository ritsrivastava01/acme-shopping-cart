/**
 * Created by Ritesh on 4/16/2016.
 */
'use strict';

angular.module('acmeApp')
    .controller('productGridCntrl',['$scope','$http','_shoppingCartData','_productdata','$uibModal',function($scope,$http,_shoppingCartData,_productdata,$uibModal){

        $scope.category="";
        $scope.hgt=  window.innerHeight-152;

        $scope.products=_shoppingCartData.getRawData();
        $scope.filterBy="All";




        $scope.refreshProductList=function(arrData){


            var selectedObjId=arrData[0];
            var isTypeId=arrData[1];
            $scope.category='';
            if(selectedObjId!=null){
                //filtered by category
                if(isTypeId)
                {

                    var CategoryData= _shoppingCartData.getGroupedData()[selectedObjId];
                    $scope.category=CategoryData[0].categoryId;
                    $scope.filterBy=CategoryData[0].category;
                    $scope.filterByImage=CategoryData[0].categoryImage;
                    $scope.products=CategoryData;
                    $scope.$emit('clrAotuomplet');
                }
                //Filter by individual product Id
                else
                {
                    $scope.category="";
                    var filterObj=_shoppingCartData.getSelectedObject(selectedObjId);
                    $scope.filterBy=filterObj.category;
                    $scope.filterByImage=filterObj.categoryImage;
                    $scope.products=[filterObj]
                }

               $scope.getMaxMinValueForSlider();
                $scope.redrawSlider();
            }
            else{
                $scope.filterBy="All";
                $scope.products=_shoppingCartData.getRawData();
                $scope.$emit('clrAotuomplet');
            }
        };
        $scope.$on('refreshGrid',function(event,selectedObj){

            $scope.refreshProductList(selectedObj);


        });
        $scope.getMaxMinValueForSlider=function(){

             var sortArray=$scope.products.sort(function (a, b) {
             if (a.priceNew > b.priceNew) {
             return 1;
             }
             if (a.priceNew < b.priceNew) {
             return -1;
             }
             // a must be equal to b
             return 0;
             });



             $scope.minValue= sortArray[0].priceNew;
            $scope.maxValue=sortArray[sortArray.length-1].priceNew;

        }
        $scope.redrawSlider=function(){

            $scope.slider.destroy()
            $scope.createSlider();

        }

        $scope.createSlider=function(){

            $scope.getMaxMinValueForSlider();
            $scope.slider= new Slider('#slider', { id: "rangeSlider", min: $scope.minValue, max: $scope.maxValue , range: true, value: [$scope.minValue, $scope.maxValue] })
                .on('slideStop', function(data){
                    debugger;
                    var sortData=[];
                    if($scope.category==''){
                        angular.forEach(_shoppingCartData.getRawData(),function(val,index){
                            if((val.priceNew>=data[0])&&( val.priceNew<=data[1]))
                            {
                                sortData.push(val);
                            }

                        })
                    }
                    else{
                        angular.forEach(_shoppingCartData.getGroupedData()[$scope.category],function(val,index){
                            if((val.priceNew>=data[0])&&( val.priceNew<=data[1]))
                            {
                                sortData.push(val);
                            }

                        })
                    }

                    // debugger;
                    $scope.products=sortData;
                    $scope.$digest($scope.products);
                });
        };
        $scope.$on('createSlider',function(){
            $scope.createSlider();

        })
        $scope.$on('fliterShortlistedData',function(){

            $scope.filterBy="Shortlist";
            $scope.products =_productdata.getArrShortlistItem();

            $scope.$emit('clrAotuomplet');
        });
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
            var modalInstance =   $uibModal.open({
                templateUrl:COMMON.UTIL.getRootWebSitePath()+COMMON.PATH.DETAIL,
                controller: 'detailCntrl',
                windowClass: 'large-Modal',
                resolve :{
                    selectedDetailsProduct: function () {
                        return $scope.selectedDetailsProduct;
                    }
                }
            });

            modalInstance.result.then(function (obj) {
               _productdata.updateAddtoCartCount(obj);
            });
        }
       // $("#slider").slider({});

    }])

