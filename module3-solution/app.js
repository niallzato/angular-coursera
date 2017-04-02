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
        found: '<',
        warningAlert: '&',
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
    var searched = false;
    narrow.search = "";
    narrow.found = [];

    //get the menu items
    narrow.narrowMenu = function () {
      if (narrow.search.length) {
        searched = false;
        var promise = MenuSearchService.getMatchedMenuItems(narrow.search)
        promise.then(function (response) {
          narrow.found = response;
          searched = true;
        })
      }
      else{
        searched = true;
      }
    };

    //remove an item
    narrow.removeItem = function (itemIndex) {
      MenuSearchService.removeItem(itemIndex);
    };

    //warning logic
    narrow.warning = function () {
      if (narrow.found == false && searched == true) {
        return true;
      }
      else{
        return false;
      }
    };

  }

  MenuSearchService.$inject = ['$http', 'ApiPath'];
  function MenuSearchService($http, ApiPath) {
    var service = this;
    var found = [];

    service.getMatchedMenuItems = function (search) {
    found = [];

    return $http({
        method: "GET",
        url: ApiPath
      }).then(function (response) {
        for (var i = 0; i < response.data['menu_items'].length; i++) {
          var item = response.data['menu_items'][i];
          if (item.name.toLowerCase().indexOf(search) !== -1) {
            found.push(response.data['menu_items'][i]);
          }
        }
        return found;

      });
    };

    service.removeItem = function (itemIndex) {
      found.splice(itemIndex, 1);
    };
  }

})();
