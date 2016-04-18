'use strict';
angular.module('acmeApp')
    .config(
        function ($stateProvider, $urlRouterProvider) {

            COMMON.NAME.HOME={
                    name:COMMON.NAME.HOME,
                    url: '',
                    templateUrl:COMMON.UTIL.getRootWebSitePath() +COMMON.PATH.HOME,
                    controller:'productGridCntrl'
            };
            COMMON.NAME.CHECKOUT={
                name:COMMON.NAME.CHECKOUT,
                url: '',
                templateUrl:COMMON.UTIL.getRootWebSitePath() +COMMON.PATH.CHECKOUT,
                controller:'checkoutCntrl'
            };



            $stateProvider.state(COMMON.NAME.HOME);
            $stateProvider.state(COMMON.NAME.CHECKOUT);
        })