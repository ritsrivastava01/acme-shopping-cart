/**
 * Created by Ritesh on 4/16/2016.
 */
'use strict';


angular.module('acmeApp')

    /*
        used to load the JSON and save the filtered data
     */
.service('_shoppingCartData',['$http',function($http){

        var groupedData={};
        var groupLabel=[];
        var rawData={};

        this.loadShoppingData= function(_callback){
            //Get the data from JSON
            $http.get(COMMON.UTIL.getRootWebSitePath() +'/products.json').success(function (response) {

                rawData = response.products;
              // var groupedData = {};
                //Create the group data based on Type
              $.each(rawData, function(i, item) {
                  //debugger;
                    var categoryId = item.categoryId;

                    //delete item.type;

                    if(groupedData[categoryId]) {
                        groupedData[categoryId].push(item);
                    } else {
                        // fetch label and id of grouped data
                        var objData={category:item.category,categoryId:item.categoryId,imgPath:item.categoryImage};
                        groupLabel.push(objData);
                        groupedData[categoryId] = [item];
                    }
                });

                _callback();

            });

        }

        //get the Data as Raw form
        this.getRawData=function(){return rawData};

        //get the Data as Grouped form
        this.getGroupedData=function(){return groupedData};

        //get the Grouped data label
        this.getGroupLabel=function(){return groupLabel};

    }])

