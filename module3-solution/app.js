(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiPath', "https://davids-restaurant.herokuapp.com/menu_items.json")
  .directive('foundItems', FoundItemsDirective);


  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        narrow: '<',
        removeItem: '&'
      },
      controller: NarrowItDownController,
      controllerAs: 'narrow',
      bindToController: true
    };

    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrow = this;
    narrow.search = "";

    narrow.narrowMenu = function () {
      var promise = MenuSearchService.getMatchedMenuItems(narrow.search)
      promise.then(function (response) {
        narrow.found = response;
      })
    };

    narrow.removeItem = function (itemIndex) {
      MenuSearchService.removeItem(itemIndex);
    };

  }

  MenuSearchService.$inject = ['$http', 'ApiPath'];
  function MenuSearchService($http, ApiPath) {
    var service = this;
    var found = [];
    // List of items to buy and bought

    service.getMatchedMenuItems = function (search) {
    return $http({
        method: "GET",
        url: ApiPath
      }).then(function (response) {
        //var foundItems = [];

        for (var i = 0; i < response.data['menu_items'].length; i++) {
          var item = response.data['menu_items'][i];
          if (item.name.toLowerCase().indexOf(search) !== -1) {
            found.push(response.data['menu_items'][i]);
          }
        }
        //found = foundItems;
        return found;
      });
    };

    service.removeItem = function (itemIndex) {
      found.splice(itemIndex, 1);
    };
  }

})();
