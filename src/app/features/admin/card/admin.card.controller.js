(function (angular) {
  'use strict';

  angular
      .module('egen.app.admin.card')
      .controller('AdminCardController', AdminCardController);


  function AdminCardController(ngDialog,$http,$q,adminCardDialogService,dataService,$scope) {

    var adminCardVm = this;

    adminCardVm.isTableEnable = true;


    adminCardVm.openDialogue = function () {
      var cardScope = $scope.$new();
      cardScope.layout = 'card';

      var cardDataPromise = dataService.getData();

      cardDataPromise.then(function(data){
        adminCardVm.sampleData = data;

        adminCardVm.jsonKeys = Object.keys(adminCardVm.sampleData[0]);

        ngDialog.open({
          template: 'app/components/templates/modalDialog/admin.modal.tmpl.html',
          scope: cardScope,
          controller: "AdminTableDialogController",
          controllerAs: 'adminDialogVm',
          resolve: { columns: function() {
            return adminCardVm.jsonKeys;
          } }
        });
      });
    };

    adminCardVm.list = adminCardDialogService.list();

    adminCardVm.removeColumn = function (colIndex) {
      adminCardDialogService.remove(colIndex);
      adminCardVm.list = adminCardDialogService.list();
    }

    //adminTableVm.saveSettings = function(isTableEnable){
    //  adminTableVm.isTableEnable = isTableEnable
    //  console.log('Table Controller',adminTableVm.isTableEnable)
    //  AdminTableDialogService.showTable(adminTableVm.isTableEnable)
    //}


  }

})(angular);

