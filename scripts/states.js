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


            $stateProvider.state(COMMON.NAME.HOME);
        })