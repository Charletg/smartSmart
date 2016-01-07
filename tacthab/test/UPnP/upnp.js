var utils = require("../../js/utils.js"),
    parser = new DOMParser();

//require("./upnp.css");

var app = angular.module('myApp', ['ngRoute']);

console.log("TEST");
console.log(window.mediaServers);
app.controller('mediaBrowserCtrl', function ($scope) {
    $scope.mediaServers = window.mediaServers;
});

console.log("Accessing server to get context.");

var getContext = utils.XHR('GET', '/getContext');
getContext.then(function (response) {
    var json = JSON.parse(response.responseText)
    console.log(json);
}, function (err) {
    console.error(err);
});
// Subscribing to appearing/disappearing events
utils.initIO(window.location.origin + "/m2m");

// Réupère le contenu du fichier Json et l'affiche à la vue
/**
 * $scope: la vue $http: la page courante
 */

app.directive('mediaExplorer', function () {
    return {
        restrict: 'E',
        scope: {
            // mediaServer: '=',
        },
        templateUrl: function (elem, attrs) {
            return 'templates/media-explorer.html';
        }
    }
});



app.controller(
    'ServeurMediasController',
    function ($scope, $http) {

        $scope.filAriane = [];

        utils.io.on("brickAppears", function (json) {
            console.log("brickAppears:", json);
            $http.get('/getContext').success(function (response) {
                // console.log('bricks ' +
                // JSON.stringify(response.bricks ));
                $scope.medias = response.bricks;

            });
        });
        utils.io.on("brickDisappears", function (json) {
            console.log("brickDisappears:", json);
            $http.get('/getContext').success(function (response) {
                // console.log('bricks ' +
                // JSON.stringify(response.bricks ));
                $scope.medias = response.bricks;

            });
        });

        $http.get('/getContext').success(function (response) {
            // console.log('bricks ' +
            // JSON.stringify(response.bricks ));
            $scope.medias = response.bricks;

            console.log($scope.medias);

        });

        /**
         * Insere les containers du media en fonction de son id
         * Renvoie les containers insérés
         */
        function insererContainers(medias, id, containers) {
            angular.forEach(medias, function (media, mediaIndex) {
                if (media.id === id) {
                    media["containers"] = containers;
                    return media["containers"];

                }
            });

        }

        /**
         * Insere les items du media en fonction de son id Renvoie
         * les items insérés
         */
        function insererItems(medias, id, items) {
            angular.forEach(medias, function (media, mediaIndex) {
                if (media.id === id) {
                    media["items"] = items;
                    return media["items"];
                }
            });

        }

        $scope.setMediaRenderer = function (idMediaRenderer,
            mediaRendererName) {
            $scope.idMediaRenderer = idMediaRenderer;
            alert('Le nouveau MediaRenderer est ' + mediaRendererName);
        }

        // Navigation dans le serveur
        // id : id du média serveur
        $scope.navigation = function (idMediaServer, idConteneur) {
            var tableauDeRetour = [];
            var traiterContainers = function (containers) {
                // console.log('containers ' +
                // JSON.stringify(containers ));
                $scope.idMediaServeur = idMediaServer;

                /** 
                 * Fil d'ariane
                 */
                utils.call(
                    idMediaServer,
                    'getMetaData', [idConteneur],
                    function (data) {

                        var doc = parser.parseFromString(data,
                                "text/xml"),
                            res = doc
                            .querySelector("Result");
                        console.log(res);
                        if (res) {
                            res = res.textContent;
                            // console.log('res : ' +
                            // JSON.stringify(res));
                            var docRes = parser.parseFromString(
                                res, "text/xml");


                            var indexIdConteneur = $scope.filAriane.map(function (d) {
                                return d['idConteneur'];
                            }).indexOf(idConteneur);
                            var filArianeLength = $scope.filAriane.map(function (d) {
                                return d['idConteneur'];
                            }).length;
                            if (indexIdConteneur == -1) {
                                $scope.filAriane.push({
                                    "idConteneur": idConteneur,
                                    "titre": docRes.querySelector("title").textContent
                                });
                            } else if (indexIdConteneur < filArianeLength - 1) {
                                var nbElemASupprimer = filArianeLength - 1 - indexIdConteneur;
                                var debutDelete = indexIdConteneur + 1;
                                $scope.filAriane.splice(debutDelete, nbElemASupprimer);
                            }
                            $scope.$apply();
                            /**
                             * Fin fil d'ariane
                             */

                        }




                    });
                angular
                    .forEach(
                        containers,
                        function (container, containerIndex) {

                            console
                                .log('container ______ ' + JSON
                                    .stringify(container));
                            var cheminPhoto = "./templates/folder.png";
                            if (container
                                .querySelector("icon")) {
                                cheminPhoto = container
                                    .querySelector("icon").textContent;
                            }
                            // console.log('container ' +
                            // containerIndex + '
                            // _______________ ' +
                            tableauDeRetour
                                .push({
                                    id: container
                                        .getAttribute("id"),
                                    title: container
                                        .querySelector("title").textContent,
                                    icon: cheminPhoto,
                                    // creator:
                                    // container.querySelector("creator").textContent,
                                    // genre:
                                    // container.querySelector("genre").textContent,
                                    // description:
                                    // container.querySelector("description").textContent,
                                    upnpClass: container
                                        .querySelector("class").textContent,
                                    idMediaServer: idMediaServer
                                });

                        });

                insererContainers($scope.medias, idMediaServer,
                    tableauDeRetour);
                $scope.containers = tableauDeRetour;
                $scope.$apply();

            };

            var traiterItems = function (items) {

                angular
                    .forEach(
                        items,
                        function (container, containerIndex) {

                            var cheminPhoto = "./templates/folder.png";
                            if (container
                                .querySelector("albumArtURI")) {
                                cheminPhoto = container
                                    .querySelector("albumArtURI").textContent;
                            }

                            tableauDeRetour
                                .push({
                                    id: container
                                        .getAttribute("id"),
                                    title: container
                                        .querySelector("title").textContent,
                                    creator: container
                                        .querySelector("creator").textContent,
                                    genre: container
                                        .querySelector("genre").textContent,
                                    icon: cheminPhoto,

                                    // description:
                                    // container.querySelector("description").textContent,
                                    upnpClass: container
                                        .querySelector("class").textContent,
                                    idMediaServer: idMediaServer
                                });

                        });

                insererItems($scope.medias, idMediaServer,
                    tableauDeRetour);
                $scope.containers = tableauDeRetour;
                $scope.$apply();
                // console.log('tableau de retour '
                // + JSON.stringify(tableauDeRetour));

                /**
                 * 
                 */
            };

            /**
             * 
             */

            utils.call(
                idMediaServer,
                'Browse', [idConteneur],
                function (data) {

                    var doc = parser.parseFromString(data,
                            "text/xml"),
                        res = doc
                        .querySelector("Result");
                    if (res) {
                        res = res.textContent;
                        // console.log('res : ' +
                        // JSON.stringify(res));
                        var docRes = parser.parseFromString(
                            res, "text/xml");
                        // console.log(docRes);
                        var containers = docRes
                            .querySelectorAll("container");

                        traiterContainers(containers);

                        var items = docRes
                            .querySelectorAll("item");
                        traiterItems(items);
                    }

                }).then(function (v) { /* /console.log(v); */ })
        };
        $scope.lire = function (idMediaServer, idItem) {
            alert('idMediaServer ' + idMediaServer + ' idMediaRenderer ' + $scope.idMediaRenderer + 'idItem' + idItem);
            utils.call($scope.idMediaRenderer, 'loadMedia', [
								idMediaServer, idItem], function (data) {
                var doc = parser.parseFromString(data, "text/xml");
                console.log("load", doc);
                utils.call($scope.idMediaRenderer, 'Play', [],
                    function (res) {
                        console.log(res);
                    });
            });
        };

        $scope.pause = function () {
            utils.call($scope.idMediaRenderer, 'Pause', [],
                function (res) {
                    console.log(res);
                });
        };

        $scope.relancer = function () {
            utils.call($scope.idMediaRenderer, 'Play', [],
                function (res) {
                    console.log(res);
                });
        }

        $scope.stop = function () {
            utils.call($scope.idMediaRenderer, 'Stop', [],
                function (res) {
                    console.log(res);
                });
        }

        // Navigation du contenu du media server
        $scope.navigationMediaServer = function (idConteneur,
            idMediaServer) {
            utils
                .call(
                    idMediaServer,
                    'Browse', [idConteneur],
                    function (data) {
                        var doc = parser.parseFromString(
                            data, "text/xml");
                        console
                            .log(
                                "doc",
                                doc,
                                doc
                                .querySelector("Result").textContent);
                    });
        };

        $scope.reglerVolume = function (idRange) {
            var volume = angular.element(
                    document.getElementById('range' + idRange))
                .val();
            $scope.vol = volume;
            utils.call($scope.idMediaRenderer, 'setVolume', [volume], function (data) {
                console.log(data);
            });
        };


    });

/*
 * utils.call ( 'bd61cc5d-3765-511c-800d-6f823b3bfb81' , 'Browse' ,[0] ,
 * function(data){ //console.log(res); var doc = parser.parseFromString(data,
 * "text/xml") , res = doc.querySelector("Result").textContent; console.log(doc,
 * res); if(res) { var docRes = parser.parseFromString(res, "text/xml");
 * console.log( res,docRes, docRes.querySelectorAll("container") ); }
 * 
 * });
 */