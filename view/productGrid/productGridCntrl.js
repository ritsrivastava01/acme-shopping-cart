/**
 * This controller is used to following functions:
 * 1. Provide the filer with following options:
 *      1.1 Filter By Price range
 *      1.2 Ascending Sorting order
 *      1.3 Descending sorting order
 *      1.4 remove the applied filter and load all data
 * 2. Show the no records.
 * 3. Load the Product list
 */
'use strict';

angular.module('acmeApp')
    .controller('productGridCntrl',['$scope','$http','_shoppingCartData','_productdata','$uibModal',
                function($scope,$http,_shoppingCartData,_productdata,$uibModal){


        $scope.category="";
        //Product Grid Height
        $scope.hgt=  window.innerHeight-152;
        //Product data
        $scope.products=_shoppingCartData.getRawData();
        //default filter option
        $scope.filterBy="All";

         /*FUNCTION : refresh the Product list data
          arrData:array:
                1. selected object
                2.TypeID
                    if  null ->indicates load only single item
                    else ->indicates load all data based on category ID (type  Id)
           */
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


            }
            else{
                $scope.filterBy="All";
                $scope.products=_shoppingCartData.getRawData();
                $scope.$emit('clrAotuomplet');
            }

            $scope.getMaxMinValueForSlider();
            $scope.redrawSlider();
        };


        //FUNCTION : get the min/max  values for slider
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
        //Function: Redraw slider
        $scope.redrawSlider=function(){

            $scope.slider.destroy()
            $scope.createSlider();

        }
        //FUNCTION: create the slider
        $scope.createSlider=function(){

            $scope.getMaxMinValueForSlider();
            $scope.slider= new Slider('#slider', { id: "rangeSlider", min: $scope.minValue, max: $scope.maxValue , range: true, value: [$scope.minValue, $scope.maxValue] })
                .on('slideStop', function(data){
                    //$scope.$emit('clrAotuomplet');
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

                    $scope.products=sortData;
                    $scope.$digest($scope.products);
                });
        };

        //EVENT LISTENER : to refresh the grid data
        //listen from header
        $scope.$on('refreshGrid',function(event,selectedObj){
            $scope.refreshProductList(selectedObj);

        });

        //EVENT LISTENER : used to  create the slider
        //listen from parent class(productGrid)
        $scope.$on('createSlider',function(){
            $scope.createSlider();

        });

        //Event listener :Show the shortlisted items
        //listen from parent class(productGrid)
        $scope.$on('fliterShortlistedData',function(){
            $scope.filterBy="Shortlist";
            $scope.products =_productdata.getArrShortlistItem();
            //dispatch the event to clear the auto-complete text box
            $scope.$emit('clrAotuomplet');
        });

        //Function : used to update the shortlisted data and show the alert box
        $scope.updateShortlistArray=function(product,isShortlisted){
            _productdata.updateShortListItem(product);
            if(isShortlisted)
            {
                $scope.showAlertMessage('alert alert-success',"Wao!","Product added to your shortlist.");
            }
          else
            {
                $scope.showAlertMessage('alert alert-warning',"OOPS!","Product removed from your shortlist.");
            }

        }

        //FUNCTION : used to update the add To Cart array  and show the alert box
        $scope.updateAddToCartArray=function(product,isAddTocart){
            _productdata.updateArrAddToCartItem(product);
            if(isAddTocart)
            {
                $scope.showAlertMessage('alert alert-success',"Wao!","Product added to your Cart.");
            }
            else
            {
                $scope.showAlertMessage('alert alert-warning',"OOPS!","Product removed from your Cart.");
            }



        }
        //FUNCTION: Show the alert box
        $scope.showAlertMessage=function(cls,message1,message2){
            $scope.alertClass=cls;
            $scope.alertMsg1=message1;
            $scope.alertMsg2=message2;
            $("#divAlert").fadeTo(2000, 500).slideUp(300, function(){});
        }

        //FUNCTION: used to sort the data on their title
        $scope.sortGridData=function(sortBy,isAscending){


            if(isAscending)
            {
                $scope.products.sort(function(a, b){
                    if(sortBy=='title')
                        var attrA=a[sortBy].toString().toLowerCase(), attrB=b[sortBy].toString().toLowerCase();
                    else if(sortBy=='priceNew')
                        var attrA=a[sortBy], attrB=b[sortBy];
                    if (attrA < attrB) //sort string ascending
                        return -1
                    if (attrA > attrB)
                        return 1
                    return 0 //default return value (no sorting)
                })
            }
            else{
                $scope.products.sort(function(a, b){
                    if(sortBy=='title')
                        var attrA=a[sortBy].toString().toLowerCase(), attrB=b[sortBy].toString().toLowerCase();
                    else if(sortBy=='priceNew')
                        var attrA=a[sortBy], attrB=b[sortBy];
                    if (attrA > attrB) //sort string ascending
                        return -1
                    if (attrA < attrB)
                        return 1
                    return 0 //default return value (no sorting)
                })
            }
        };

        //FUNCTION: used to open the detail popup Window
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

    }])

