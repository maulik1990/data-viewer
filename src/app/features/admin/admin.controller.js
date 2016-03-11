(function (angular) {
  'use strict';

  angular
      .module('egen.app.admin')
      .controller('AdminViewController', AdminViewController);


  function AdminViewController() {

    var adminVm = this;
    adminVm.activeTab = 'settings';

    adminVm.windowHeight = window.innerHeight;
  }

})(angular);
