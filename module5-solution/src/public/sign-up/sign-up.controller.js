(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService'];
function SignUpController(MenuService) {
  var reg = this;

  reg.valid = '';
  reg.submit = function () {

    if (regForm.favourite.value) {
      MenuService.getItem(regForm.favourite.value).then(function (response) {
        MenuService.setFav(response);
        reg.valid = "Your information has been saved";
      })
      .catch(function (errorResponse){
        MenuService.setFav(false);
        reg.valid = "No such menu number exists";
      })
    }

  }
}
})();
