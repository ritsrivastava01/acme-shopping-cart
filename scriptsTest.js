
angular.module('app',['ngAnimate', 'ui.bootstrap'])
	.controller('cntrl',function($scope,$uibModal){

		$scope.openModalPopup=function(){

			$uibModal.open({
				templateUrl: 'detail.html'

			});
		}

	})

/*
.controller('cntrl', ['$scope','$modal',function ($scope,$modal) {

		$scope.openModalPopup=function(){

			$modal.open({
				templateUrl: 'detail.html'

			});
		}
	}])
*/

