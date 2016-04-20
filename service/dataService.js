/**
 * Created by Ritesh on 4/16/2016.
 */
'use strict';


angular.module('acmeApp')

    /*
        used to load the JSON and save the filtered data
     */
.service('_shoppingCartData',['$http','_productdata',function($http,_productdata){

        var groupedData={};
        var groupLabel=[];
        var rawData={};

        this.loadShoppingData= function(_callback){
            //Get the data from JSON
            $http.get(COMMON.UTIL.getRootWebSitePath() +'/products.json').success(function (response) {

               // localStorage.clear();
                var previousSaveShortItm,previousSaveCartItm=undefined;
                if(localStorage.getItem("shortlistItm")!=null)
                previousSaveShortItm=JSON.parse(localStorage.getItem("shortlistItm"));
                if(localStorage.getItem("cartItm")!=null)
                previousSaveCartItm=JSON.parse(localStorage.getItem("cartItm"));

                rawData = response.products;
              // var groupedData = {};
                //Create the group data based on Type
              $.each(rawData, function(i, item) {
                  //debugger;
                    var categoryId = item.categoryId;
                    if(previousSaveShortItm!=null){
                        angular.forEach(previousSaveShortItm,function(val,index){
                            if(val.id==item.id){
                                item.isSortlisted=true;
                                _productdata.updateShortListItem(val);
                            }

                        })
                    }

                  if(previousSaveCartItm!=null){
                      angular.forEach(previousSaveCartItm,function(val,index){
                          if(val.id==item.id)
                          {
                              item.isAddedtocart=true;
                              _productdata.updateArrAddToCartItem(val);
                          }

                      })
                  }

                    //delete item.type;

                    if(groupedData[categoryId]) {
                        groupedData[categoryId].push(item);
                    } else {
                        // fetch label and id of grouped data
                        var objData={category:item.category +"'s Wears",categoryId:item.categoryId,imgPath:item.categoryImage};
                        groupLabel.push(objData);
                        groupedData[categoryId] = [item];
                    }

                });

                _callback();

            });

        }
        //Return the selected object based on passed ID
        this.getSelectedObject=function(objId)
        {
            var selObj=null;

            angular.forEach(rawData,function(val,index){
                if(val.id==objId)
                {
                    selObj=val;
                }
            })
            return selObj;
        }

        //get the Data as Raw form
        this.getRawData=function(){return rawData};

        //get the Data as Grouped form
        this.getGroupedData=function(){return groupedData};

        //get the Grouped data label
        this.getGroupLabel=function(){return groupLabel};

    }])

.service('_productdata',function(){
        var arrShortlistItem=[];
        var arrAddToCartItem=[];
        this.updateShortListItem=function(item)
        {
            var indexes = $.map(arrShortlistItem, function(obj, index) {
                if(obj.id == item.id) {
                    return index;
                }
            });
            var firstIndex = indexes[0];
            if(firstIndex==undefined)
                arrShortlistItem.push(item);
            else{
                arrShortlistItem.splice(firstIndex,1);
            }
            localStorage.setItem('shortlistItm',JSON.stringify(arrShortlistItem));
        };
        this.getArrShortlistItem=function(){return arrShortlistItem};
        this.updateArrAddToCartItem=function(item)
        {
            var indexes = $.map(arrAddToCartItem, function(obj, index) {
                if(obj.id == item.id) {
                    return index;
                }
            });
            var firstIndex = indexes[0];
            if(firstIndex==undefined)
            {

                arrAddToCartItem.push(item);
                angular.forEach(arrShortlistItem,function(val,index){
                    if(item.id==val.id)
                        val.isAddedtocart=true;
                })
            }

            else{
                angular.forEach(arrShortlistItem,function(val,index){
                    if(item.id==val.id)
                        val.isAddedtocart=false;
                })
                arrAddToCartItem.splice(firstIndex,1);
            }
            //update the shorlist Array


            //debugger;
            localStorage.setItem('cartItm',JSON.stringify(arrAddToCartItem));
        };
        this.getArrAddToCartItem=function(){return arrAddToCartItem};

        this.updateAddtoCartCount=function(item)
        {
            if(arrAddToCartItem.length==0){
                arrAddToCartItem.push(item);
            }
            else
            {

                var indexes = $.map(arrAddToCartItem, function(obj, index) {
                    if(obj.id == item.id) {
                        return index;
                    }
                });
                var firstIndex = indexes[0];
                if(firstIndex==undefined)
                {

                    arrAddToCartItem.push(item);
                }

                else{
                    angular.forEach(arrAddToCartItem,function(val,index){
                        if(val.id==item.id)
                        {
                            val.quantity=item.quantity;
                        }
                    })
                }




        }
            localStorage.setItem('cartItm',JSON.stringify(arrAddToCartItem));
        };

    })

