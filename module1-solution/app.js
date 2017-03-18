(function () {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.list = "g";
    $scope.message = "one";

    $scope.countItems = function () {
      var items = $scope.list.split(',');
      console.log(items);
      var amount = items.length;
      console.log(amount);
      displayMessage(amount)
    }

    function displayMessage(amount) {
      if (amount <= 3) {
        $scope.message = "yum";
      } else {
        $scope.message = "yuk";
      }
    }

  }
})();
