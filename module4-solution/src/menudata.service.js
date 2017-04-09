(function () {
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService)
.constant('Cat', "https://davids-restaurant.herokuapp.com/categories.json")
.constant('ItemForCat', "https://davids-restaurant.herokuapp.com/menu_items.json");

MenuDataService.$inject = ['$http', 'Cat', 'ItemForCat']
function MenuDataService($http, Cat, ItemForCat) {
  var service = this;

  // Returns a promise, NOT items array directly
  service.getAllCategories = function () {
    return $http({
      method: "GET",
      url: "https://davids-restaurant.herokuapp.com/categories.json"
    });
  };

  service.getItemsForCategory = function (categoryShortName) {
    return $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json",
        params: {category: categoryShortName}
      });
  };
}

})();
