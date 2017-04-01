(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiPath', "https://davids-restaurant.herokuapp.com/menu_items.json");;

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrow = this;
    narrow.search = "";

    narrow.narrowMenu = function () {
      narrow.found = 'fdfddf';
      var promise = MenuSearchService.getMatchedMenuItems(narrow.search)
      promise.then(function (response) {
        narrow.found = response;
      })
    };

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
        var foundItems = [];

        for (var i = 0; i < response.data['menu_items'].length; i++) {
          var item = response.data['menu_items'][i];
          if (item.name.toLowerCase().indexOf(search) !== -1) {
            foundItems.push(response.data['menu_items'][i]);
          }
        }
        //var foundItems = response.data['menu_items'][0].name;

        return foundItems;
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
