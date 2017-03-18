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
      var realItems = 0;
      console.log(items);
      for (var i = 0; i < items.length; i++) {
        if (items[i]) {
          realItems++
        }
      }
      var amount = items.length;
      console.log(amount);
      console.log(realItems);
      displayMessage(amount)
    }

    function displayMessage(amount) {
      if (amount == 0) {
        $scope.message = "Please enter data first";
      } else if (amount <= 3) {
        $scope.message = "Enjoy!";
      } else {
        $scope.message = "Too much!";
      }
    }

  }
})();
