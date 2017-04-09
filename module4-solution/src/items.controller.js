(function () {
'use strict';

angular.module('Data')
.controller('ItemsController', ItemsController);


ItemsController.$inject = ['MenuDataService', 'items'];
function ItemsController(MenuDataService, items) {
  var itemsCtrl = this;
  itemsCtrl.items = items.data.menu_items;
  itemsCtrl.cat = items.data.category.name;
}

})();
