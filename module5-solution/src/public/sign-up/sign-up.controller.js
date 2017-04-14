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
        MenuService.setFav(regForm.favourite.value);
        reg.valid = true;
      })
      .catch(function (errorResponse){
        MenuService.setFav('Not set');
        reg.valid = false;
      })
    }


  }

}

})();


// (function () {
//   "use strict";
//
//   angular.module('public')
//   .controller('signUpController', signUpController);
//
//   signUpController.$inject = ['ApiPath', 'MenuService'];
//   function signUpController(ApiPath, MenuService)
//   {
//     var $ctrl = this;
//     $ctrl.submit = function () {
//       $ctrl.basePath = ApiPath;
//
//       MenuService.getItem(regForm.favoriteDish.value).then(function () {
//         MenuService.setInfo(regForm);
//         $ctrl.valid = true;
//         $ctrl.wrongDish = false;
//       })
//       .catch(function (errorResponse){
//         $ctrl.valid = false;
//         $ctrl.wrongDish = true;
//       })
//     }
//   }
// })();
