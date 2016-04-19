/*
* File is used for creating states of the application
* */
'use strict';
angular.module('acmeApp')
    .config(
        function ($stateProvider, $urlRouterProvider) {
            //Creating HOME state
            COMMON.NAME.PRODUCT_GRID={
                    name:COMMON.NAME.PRODUCT_GRID,
                    url: '',
                    templateUrl:COMMON.UTIL.getRootWebSitePath() +COMMON.PATH.PRODUCT_GRID,
                    controller:'productGridCntrl'
            };
            //Creating Checkout state
            COMMON.NAME.CHECKOUT={
                name:COMMON.NAME.CHECKOUT,
                url: '',
                templateUrl:COMMON.UTIL.getRootWebSitePath() +COMMON.PATH.CHECKOUT,
                controller:'checkoutCntrl'
            };


            //Add the state in state provider
            $stateProvider.state(COMMON.NAME.PRODUCT_GRID);
            $stateProvider.state(COMMON.NAME.CHECKOUT);
        })