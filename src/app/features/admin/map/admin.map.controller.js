(function (angular) {
  'use strict';

  angular
      .module('egen.app.admin.map')
      .controller('AdminMapController', AdminMapController);


  function AdminMapController(ngDialog,$http,$q,adminMapDialogService,jsonIteratorService,dataService,$scope) {

    var adminMapVm = this;
    adminMapVm.isMapEnable = adminMapDialogService.isMapEnable();
    adminMapVm.mapData = adminMapDialogService.list();
    adminMapVm.isKeyPresent = isKeyPresent;
    adminMapVm.removeColumn = removeColumn;
    adminMapVm.openDialogue = openDialogue;

    adminMapVm.isMapKeyAvailable = false;

      adminMapVm.mapDataChunk = dataService;
      console.log(jsonIteratorService.getJsonKeys().length);

      if (jsonIteratorService.getJsonKeys().length === 0) {
          adminMapVm.buildJsonKeys = jsonIteratorService.JsonIterator(adminMapVm.mapDataChunk[0],'');
      }


    function openDialogue (content) {
      var mapScope = $scope.$new();
      mapScope.layout = 'map';
      mapScope.content = content;
      mapScope.jsonKeys = jsonIteratorService.getJsonKeys();


        ngDialog.open({
          template: 'app/components/templates/modalDialog/admin.modal.tmpl.html',
            className: 'ngdialog-theme-default dialog-width',
            scope: mapScope,
          controller: "AdminTableDialogController",
          controllerAs: 'adminDialogVm',
          resolve: { columns: function() {
            return mapScope.jsonKeys;
          } },
        }).closePromise.then(function(data){
            if((data.value) && (typeof data.value === "object")){
                adminMapVm.mapData = data.value;
            }

        });
    }

      function isKeyPresent(key){
          for(var mapKey in adminMapVm.mapData ) {
              if( adminMapVm.mapData.hasOwnProperty(mapKey) ) {
                  if(key === mapKey) {
                      switch (mapKey) {
                          case 'content1':
                              adminMapVm.content1 = adminMapVm.mapData[mapKey];
                              break;
                          case 'content2':
                              adminMapVm.content2 = adminMapVm.mapData[mapKey];
                              break;
                          case 'content3':
                              adminMapVm.content3 = adminMapVm.mapData[mapKey];
                              break;
                          case 'content4':
                              adminMapVm.content4 = adminMapVm.mapData[mapKey];
                              break;
                          default:
                      }
                      return true;

                  }
              }
          }
      }

      function removeColumn(mapKey){
      adminMapDialogService.remove(mapKey);
      adminMapVm.mapData = adminMapDialogService.list();
    }

    adminMapVm.saveSettings = function(isMapEnable){
      adminMapVm.isMapEnable = isMapEnable;
      adminMapDialogService.showMap(adminMapVm.isMapEnable);
    };
  }

})(angular);

