var mediaBrowser = angular.module('mediaBrowser', []);
mediaBrowser.controller('mediaBrowserCtrl', ['$scope',
    function ($scope) {
        $scope.mediaServers = window.mediaServers;
    }]);
/*    .directive('mediaServer', function () {
 return {
 template: 'Name: {{customer.name}} Address: {{customer.address}}'
 };
 })*/