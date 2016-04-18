/**
 * Created by Ritesh on 4/16/2016.
 */
'use strict';

angular.module('acmeApp')
    .controller('detailCntrl',function($scope,_productdata,selectedDetailsProduct) {
        console.log(selectedDetailsProduct);
        $scope.selectedDetailsProduct=selectedDetailsProduct;
    })
