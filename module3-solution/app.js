(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiPath', "https://davids-restaurant.herokuapp.com/menu_items.json");;

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrow = this;
    narrow.search = "f";

    var promise = MenuSearchService.getMatchedMenuItems(narrow.search)
    promise.then(function (response) {
      narrow.found = response;
    })

    console.log(narrow.found);
  }

  MenuSearchService.$inject = ['$http', 'ApiPath'];
  function MenuSearchService($http, ApiPath) {
    var service = this;
    // List of items to buy and bought

    service.getMatchedMenuItems = function (search) {
    return $http({
        method: "GET",
        url: ApiPath
      }).then(function (response) {
        return response.data;
      });
    };



    //buy the item move form one array to another
    // service.getMatchedMenuItems = function (itemIndex) {
    //   var bought = toBuyItems[itemIndex];
    //   toBuyItems.splice(itemIndex, 1);
    //   boughtItems.push(bought);
    // };
    //
    // service.getToBuyItems = function () {
    //   return toBuyItems;
    // };
    //
    //  service.getBoughtItems = function () {
    //    return boughtItems;
    //  };
  }

})();
