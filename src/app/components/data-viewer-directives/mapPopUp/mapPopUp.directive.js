/**
 * Created by aparikh on 10/7/15.
 */
(function(angular) {
    'use strict';

    angular
        .module('egen.app.dataViewerDirectives')
        .directive('dvMapPopup', dvMapPopup);

    function dvMapPopup() {
        return {
            restrict: 'E',
            scope: {
                data: "=",
                keys: "=",
                lookup: "&",
                lookupvalue: "&"
            },
            templateUrl: 'app/components/data-viewer-directives/mapPopUp/mapPopUp.html'
        }
    }
})(angular);
