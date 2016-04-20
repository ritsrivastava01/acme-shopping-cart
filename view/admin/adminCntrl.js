/*
* adminCntrl:
* Used to add any product to database
* get the following input from user:
*   -   Product Image
*   -   Product Title
*   -   Product Desc.
*   -   Product New/Old Price
* Save the data in data base based on user input and validation
* ================================
* TODO:
* 1. validations on user input
* 2. Implement the save call
* 3. Generate the products.JSON
* ================================
*
* */
'use strict';
angular.module('acmeApp')
    .controller('adminCntrl',['$scope',function($scope) {

        //FUNCTION: used to show the  preview of the selected product image
        $scope.uploadFile = function(input){

            if (input.files && input.files[0]) {

                var reader = new FileReader();
                reader.readAsDataURL(input.files[0]);

                reader.onload = function (e) {

                    // get loaded data and render thumbnail.
                    document.getElementById("image").src = e.target.result;
                    $scope.productImg=e.target.result;
                };
            }

        };
        //FUNCTION: save the data after validation
        $scope.addProduct=function(){

        }

    }]);




