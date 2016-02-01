app.controller("mainController", function ($scope, $http) {

    $scope.init = function () {

        // Simple GET request example :
        $http.get('data.json').
        success(function (data, status, headers, config) {
            $scope.sampledata = data;

        }).
        error(function (data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    };

});