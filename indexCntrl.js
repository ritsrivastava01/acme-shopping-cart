'use strict';

angular.module('acmeApp')
/*
* indexCntrl = Used to provide the data to header
* --Used to handle the callbacks and broadcast the events
* --Used to initialize the data for application
*/
.controller('indexCntrl',['$scope', '$http', '$uibModal','_shoppingCartData','$state','$rootScope','_productdata',
			function ($scope, $http, $uibModal,_shoppingCartData,$state,$rootScope,_productdata) {

				//FUNCTION:  is used to load the data
				//Add callback function for making synchronous call
				_shoppingCartData.loadShoppingData(function () {

					//Redirect to productGrid page
					$state.transitionTo(COMMON.NAME.PRODUCT_GRID).then(function () {
						//create the slider after load the 'HOME' page
						$scope.$broadcast('createSlider');
					});
					//Create the Data source for header
					$scope.headerCategories = _shoppingCartData.getGroupLabel();//Header label data
					$scope.dataForAutoComplete = _shoppingCartData.getRawData();//Auto-complete control data
					$scope.corpName = "ACME Corp";//Company Name
					$scope.autocopletetext = "";//auto-complete text

					//WATCH FUNCTION: used to update the shortlist count
					$scope.$watch(
						// This function returns the value being watched.
						function () {return _productdata.getArrShortlistItem();},

						// This is the change listener, called when the value returned from the above function changes
						function (newVal, oldVal) {


							$scope.shortlistcount = _productdata.getArrShortlistItem().length;

						}, true);

					//WATCH FUNCTION: used to update the cart list items count
					$scope.$watch(

						// This function returns the value being watched.
						function () {return _productdata.getArrAddToCartItem();},

						// This is the change listener, called when the value returned from the above function changes
						function (newVal, oldVal) {
						//debugger;
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

				//EVENT LISTENER: for clear the auto-complete the text box
				$scope.$on('clrAotuomplet', function () {

					$scope.selectedCategory = null;
					$rootScope.$broadcast('clrText', {});

				})
				//BROADCAST the product grid refresh event
				$scope.selectedCategory = null;
				$scope.refreshProductGrid = function (newValueId, isTypeId) {
					debugger;
					//Check the current state name
					if ($state.$current.self.name == "") {
						if (newValueId != null)
							$scope.$broadcast('refreshGrid', [newValueId, isTypeId]);
						else
							$scope.$broadcast('refreshGrid', [null, null]);
					}
					//Load the productGrid page
					//After that broadcast the 'refreshgrid' function
					else if (($state.$current.self.name == COMMON.NAME.PRODUCT_GRID.name)) {
						$state.transitionTo(COMMON.NAME.PRODUCT_GRID).then(function () {
							$scope.$broadcast('refreshGrid', [newValueId, isTypeId]);
						});

					}
					//Load productGrid page, after loading
					//broadcast the 'refreshGrid' function
					//Broadcast the 'createSlider' function
					else {
						$state.transitionTo(COMMON.NAME.PRODUCT_GRID).then(function () {
							$scope.$broadcast('refreshGrid', [newValueId, isTypeId])
							$scope.$broadcast('createSlider');
						});
					}
				};
				//BROADCAST the 'filterShortlistedData'
				//That event will be received by productGrid page
				$scope.fliterShortlistedData = function () {

					$scope.$broadcast('fliterShortlistedData');
				}
				$scope.onPlaceOrderClick=function(){
					$state.transitionTo(COMMON.NAME.CHECKOUT);

				}

				$scope.myValue = false;
				$scope.cart = [];

	}
	])
