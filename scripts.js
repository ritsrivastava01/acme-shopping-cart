'use strict';

angular.module('acmeApp')
/*
* mainCntrl = Used to provide the data to header
* --Used to handle the callbacks and broadcast the events
* --Used to initialize the data for application
*/
.controller('mainCntrl',['$scope', '$http', '$uibModal','_shoppingCartData','$state','$rootScope','_productdata',
			function ($scope, $http, $uibModal,_shoppingCartData,$state,$rootScope,_productdata) {

				//Function is used to load the data
				//Add callback function for making synchronous call
				_shoppingCartData.loadShoppingData(function () {

					//Redirect to home page
					$state.transitionTo(COMMON.NAME.HOME).then(function () {
						//create the slider after load the 'HOME' page
						$scope.$broadcast('createSlider');
					});
					//Create the Data source for header
					$scope.headerCategories = _shoppingCartData.getGroupLabel();//Header label data
					$scope.dataForAutoComplete = _shoppingCartData.getRawData();//Auto-complete control data
					$scope.corpName = "ACME Corp";//Company Name
					$scope.autocopletetext = "";//auto-complete text

					//watch function used to update the shortlist count
					$scope.$watch(
						// This function returns the value being watched.
						function () {return _productdata.getArrShortlistItem();},

						// This is the change listener, called when the value returned from the above function changes
						function (newVal, oldVal) {


							$scope.shortlistcount = _productdata.getArrShortlistItem().length;

						}, true);

					//watch function used to update the cart list items count
					$scope.$watch(

						// This function returns the value being watched.
						function () {return _productdata.getArrAddToCartItem();},

						// This is the change listener, called when the value returned from the above function changes
						function (newVal, oldVal) {

							//Calculate the total cost
							//used to show in cart preview popup
							$scope.totalBeforeDiscount = 0;//Total cost before discount
							$scope.totalAfterDiscount = 0;//Total cost after discount
							var cartData = _productdata.getArrAddToCartItem();
							$scope.shoppingCart = cartData;
							//update the cost in cart
							angular.forEach(cartData, function (val, index) {
								$scope.totalBeforeDiscount += val.priceOld;
								$scope.totalAfterDiscount += val.priceNew;
							})
							$scope.cartcount = cartData.length;

						}, true);

				});

				//Event listner for clear the auto-complete the text box

				$scope.$on('clrAotuomplet', function () {

					$scope.selectedCategory = null;
					$rootScope.$broadcast('clrText', {});

				})

				$scope.selectedCategory = null;
				$scope.refreshProductGrid = function (newValueId, isTypeId) {
					//debugger;
					if ($state.$current.self.name == "") {


						if (newValueId != null)
							$scope.$broadcast('refreshGrid', [newValueId, isTypeId]);
						else
							$scope.$broadcast('refreshGrid', [null, null]);
					}
					else if (($state.$current.self.name == "home")) {
						$state.transitionTo(COMMON.NAME.HOME).then(function () {
							$scope.$broadcast('refreshGrid', [newValueId, isTypeId])
							//$scope.$broadcast('createSlider');
						});

					}
					else {
						$state.transitionTo(COMMON.NAME.HOME).then(function () {
							$scope.$broadcast('refreshGrid', [newValueId, isTypeId])
							$scope.$broadcast('createSlider');
						});
					}
				};
				$scope.fliterShortlistedData = function () {

					$scope.$broadcast('fliterShortlistedData');
				}


				$scope.myValue = false;
				$scope.cart = [];

	}
	])
