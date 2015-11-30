//get a list of media server with id, name, icon
var mediaServers = [
    {
        id: "0",
        name: "plex",
        picUrl: "test.png"
    },
    {
        id: "1",
        name: "kodi",
        picUrl: "test.png"
    }
];

var mediaBrowser = angular.module('mediaBrowser', []);
mediaBrowser.controller('mediaBrowserCtrl', ['$scope',
  function ($scope) {
            $scope.mediaServers = mediaServers;
}])
    /*    .directive('mediaServer', function () {
            return {
                template: 'Name: {{customer.name}} Address: {{customer.address}}'
            };
        })*/
;