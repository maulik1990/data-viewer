(function (angular) {
    'use strict';
    angular
        .module('egen.app.infocard')
        .controller('InfoCardController', InfoCardController);


    function InfoCardController(dataService,adminCardDialogService) {
        var infoCardVm = this;
        infoCardVm.isCardKeyAvailable = false;
        infoCardVm.cardKeyLookup = cardKeyLookup;


        infoCardVm.cardPromiseData = dataService.getData();

        infoCardVm.cardPromiseData.then(function(data) {
            infoCardVm.cardData = data;
        });

        infoCardVm.isCardViewEnable = adminCardDialogService.isCardEnable();
        infoCardVm.cardKeys = adminCardDialogService.list();


        function cardKeyLookup(key) {
            for (var cardKey in infoCardVm.cardKeys) {
                if (infoCardVm.cardKeys.hasOwnProperty(cardKey)) {
                    if (cardKey === key) {
                        infoCardVm.isCardKeyAvailable = true;
                        return infoCardVm.isCardKeyAvailable;
                    }
                }
            }
        }

    }
})(angular);