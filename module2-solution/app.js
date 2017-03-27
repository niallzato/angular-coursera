(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .controller('ToBuyController', ToBuyController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;

    bought.items = ShoppingListCheckOffService.getBoughtItems();
  }

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getToBuyItems();

    toBuy.buyItem = function (itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  }

  function ShoppingListCheckOffService() {
    var service = this;
    // List of items to buy and bought
    var toBuyItems = [{ name: "cookies", quantity: 10 },{ name: "chips", quantity: 4 },{ name: "drinks", quantity: 2 },{ name: "pizzas", quantity: 5 },{ name: "plates", quantity: 5 }];
    var boughtItems = [];

    //buy the item move form one array to another
    service.buyItem = function (itemIndex) {
      var bought = toBuyItems[itemIndex];
      toBuyItems.splice(itemIndex, 1);
      boughtItems.push(bought);
    };

    service.getToBuyItems = function () {
      return toBuyItems;
    };

     service.getBoughtItems = function () {
       return boughtItems;
     };
  }

})();
