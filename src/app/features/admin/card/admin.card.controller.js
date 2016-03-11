(function (angular) {
  'use strict';

  angular
      .module('egen.app.admin.card')
      .controller('AdminCardController', AdminCardController);


  function AdminCardController(ngDialog,$http,$q,adminCardDialogService,dataService,jsonIteratorService,$scope) {

    var adminCardVm = this;
    adminCardVm.isCardEnable = adminCardDialogService.isCardEnable();
    adminCardVm.cardData = adminCardDialogService.list();
    adminCardVm.isKeyPresent = isKeyPresent;
    adminCardVm.removeColumn = removeColumn;
    adminCardVm.openDialogue = openDialogue;

    adminCardVm.isCardKeyAvailable = false;



    function openDialogue (content) {
      var cardScope = $scope.$new();
      cardScope.layout = 'card';
      cardScope.content = content;

        cardScope.cardDataPromise = dataService.getData();

        cardScope.cardDataPromise.then(function(data){
        cardScope.sampleData = data;

        adminCardVm.jsonKeys = Object.keys(cardScope.sampleData[0]);
        // adminCardVm.jsonKeys = jsonIteratorService.JsonIterator(cardScope.sampleData[0],'');

        ngDialog.open({
          template: 'app/components/templates/modalDialog/admin.modal.tmpl.html',
          className: 'ngdialog-theme-default dialog-width',
          scope: cardScope,
          controller: "AdminTableDialogController",
          controllerAs: 'adminDialogVm',
          resolve: { columns: function() {
            return adminCardVm.jsonKeys;
          } },
        }).closePromise.then(function(data){
            if((data.value) && (typeof data.value === "object")){
                adminCardVm.cardData = data.value;
            }

        });
      });
    }

      function isKeyPresent(key){
          for(var cardKey in adminCardVm.cardData ) {
              if( adminCardVm.cardData.hasOwnProperty(cardKey) ) {
                  if(key === cardKey) {
                      switch (cardKey) {
                          case 'image':
                              adminCardVm.image = adminCardVm.cardData[cardKey];
                              break;
                          case 'name':
                              adminCardVm.name = adminCardVm.cardData[cardKey];
                              break;
                          case 'content1':
                              adminCardVm.content1 = adminCardVm.cardData[cardKey];
                              break;
                          case 'content2':
                              adminCardVm.content2 = adminCardVm.cardData[cardKey];
                              break;
                          default:
                      }
                      return true;

                  }
              }
          }
      }

      function removeColumn(cardKey){
      adminCardDialogService.remove(cardKey);
      adminCardVm.cardData = adminCardDialogService.list();
    }

    adminCardVm.saveSettings = function(isCardEnable){
      adminCardVm.isCardEnable = isCardEnable;
      adminCardDialogService.showCard(adminCardVm.isCardEnable);
    };
  }

})(angular);

