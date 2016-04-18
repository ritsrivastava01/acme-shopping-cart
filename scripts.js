'use strict';

//Stripe.setPublishableKey('pk_test_aj305u5jk2uN1hrDQWdH0eyl');
angular.module('acmeApp')

.controller('mainCntrl',function ($scope, $http, $uibModal,_shoppingCartData,$state,$rootScope,_productdata) {
		$scope.selectedDetailsProduct={
			"category":"Women",
			"categoryId":2,
			"categoryImage":"assets/images/women.svg",
			"id": 4,
			"title": "PHP",
			"image": "assets/images/11947278725_979391b9a2_z.jpg",
			"priceOld": 2100,
			"priceNew": 1500,
			"size":"6-12 M",
			"isSortlisted":false,
			"isAddedtocart":false,
			"desc":"Inspired by latest trend, this pretty hairband will turn your little girl into a princess. Create an effortless fashion statement by pairing this hairband with a beautiful dress along with comfortable sandals to complete the look. Features Holds hair in place without breaking them."
		};
		$uibModal.open({
			templateUrl:COMMON.UTIL.getRootWebSitePath()+COMMON.PATH.DETAIL,
			controller: 'detailCntrl',
			windowClass: 'large-Modal',
			resolve :{
				selectedDetailsProduct: function () {
					return $scope.selectedDetailsProduct;
				}
			}
		});


		_shoppingCartData.loadShoppingData(function(){
			$state.transitionTo(COMMON.NAME.HOME);
			//$state.transitionTo(COMMON.NAME.CHECKOUT);
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


					$scope.totalBeforeDiscount=0;
					$scope.totalAfterDiscount=0;
					var cartData=_productdata.getArrAddToCartItem();
					$scope.shoppingCart=cartData;
					angular.forEach(cartData,function(val,index) {
						$scope.totalBeforeDiscount += val.priceOld;
						$scope.totalAfterDiscount+= val.priceNew;
					})
					$scope.cartcount=cartData.length;
					//$scope.$apply();
				}, true);


			//$scope.categories;
		});

		$scope.onPlaceOrderClick=function(){
			$state.transitionTo(COMMON.NAME.CHECKOUT);
			/*$modal.open({
				templateUrl: 'view/checkout/checkout.html',
				controller: 'CheckoutCtrl',

			});*/
		}

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



		/*$scope.checkout = function () {
			$modal.open({
				templateUrl: 'view/checkout/checkout.html',
				controller: 'CheckoutCtrl',
				resolve: {
					totalAmount: $scope.getCartPrice
				}
			});
		};*/
	})

/*.controller('CheckoutCtrl', function ($scope) {
		//$scope.totalAmount = totalAmount;

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
	});*/
