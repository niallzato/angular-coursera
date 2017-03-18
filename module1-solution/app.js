(function () {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.list = "";
    $scope.message = "";
    $scope.messageClass = "";

    $scope.countItems = function () {
      var items = $scope.list.split(',');
      var realItems = 0;
      //only check real items
      for (var i = 0; i < items.length; i++) {
        if (items[i]) {
          realItems++
        }
      }
      displayMessage(realItems)
    }

    function displayMessage(amount) {
      if (amount == 0) {
        $scope.message = "Please enter data first";
        $scope.messageClass = "warning";
      } else if (amount <= 3) {
        $scope.message = "Enjoy!";
        $scope.messageClass = "positive";
      } else {
        $scope.message = "Too much!";
        $scope.messageClass = "positive";
      }
    }
  }
})();
