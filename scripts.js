'use strict';

//Stripe.setPublishableKey('pk_test_aj305u5jk2uN1hrDQWdH0eyl');
angular.module('acmeApp')

.controller('mainCntrl',function ($scope, $http, $modal,_shoppingCartData,$state,$rootScope,_productdata) {



		_shoppingCartData.loadShoppingData(function(){
			$state.transitionTo(COMMON.NAME.HOME);
			$scope.categories =_shoppingCartData.getGroupLabel();
			$scope.corpName="ACME Corp";

			$scope.$watch(function () {
					return _productdata.getArrShortlistItem();
				},

				function(newVal, oldVal) {


					$scope.shortlistcount=_productdata.getArrShortlistItem().length;
					//$scope.$apply();
				}, true);


			$scope.$watch(function () {
					return _productdata.getArrAddToCartItem();
				},

				function(newVal, oldVal) {


					$scope.cartcount=_productdata.getArrAddToCartItem().length;
					//$scope.$apply();
				}, true);


			//$scope.categories;
		});
		$scope.autocopletetext="";
		$scope.$on('clrAotuomplet',function()
		{
			$scope.selectedCategory=null;
			$rootScope.$broadcast('clrText',{});

		})

		$scope.selectedCategory=null;
		$scope.refreshProductGrid =function(newValue){
			if(newValue!=null)
			$scope.$broadcast('refreshGrid',newValue.originalObject);
			else
				$scope.$broadcast('refreshGrid',null);
		};


	$scope.myValue = false;
		$scope.cart = [];



		$scope.checkout = function () {
			$modal.open({
				templateUrl: 'checkout.html',
				controller: 'CheckoutCtrl',
				resolve: {
					totalAmount: $scope.getCartPrice
				}
			});
		};
	})

.controller('CheckoutCtrl', function ($scope, totalAmount) {
		$scope.totalAmount = totalAmount;

		$scope.onSubmit = function () {
			$scope.processing = true;
		};

		$scope.stripeCallback = function (code, result) {
			$scope.processing = false;
			$scope.hideAlerts();
			if (result.error) {
				$scope.stripeError = result.error.message;
			} else {
				$scope.stripeToken = result.id;
			}
		};

		$scope.hideAlerts = function () {
			$scope.stripeError = null;
			$scope.stripeToken = null;
		};
	});
