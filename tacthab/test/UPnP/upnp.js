var utils = require("../../js/utils.js"),
    parser = new DOMParser();
require("./upnp.css");
console.log("Accessing server to get context.");
var getContext = utils.XHR('GET', '/getContext'),
    mediaServers = [];
getContext.then(function (response) {
        var json = JSON.parse(response.responseText),
            myServices = new Array(json.bricks);
        myServices = myServices[0];
        for (var service in myServices) {
            var mediaServer = {};
            mediaServer.id = myServices[service].id;
            mediaServer.name = myServices[service].name;
            mediaServer.iconURL = myServices[service].iconURL;
            mediaServers.push(mediaServer);
        }
        if (mediaServers[0]) {
            var idFirstBrick = mediaServers[0].id;
            utils.call(idFirstBrick,
                'Browse',
                [0],
                function (res) {
                    console.log("Reponse XML :  " + res);
                    var doc = parser.parseFromString(res, "text/xml");
                    console.log(doc);
                });
        }
        window.mediaServers = mediaServers;
    },
    function (err) {
        return err;
    }
);
// Subscribing to appearing/disappearing events
utils.initIO(window.location.origin + "/m2m");
utils.io.on("brickAppears", function (json) {
        console.log("brickAppears:", json);
        var mediaServer = {};
        mediaServer.id = json.id;
        mediaServer.name = json.name;
        mediaServer.iconURL = json.iconURL;
        mediaServers.push(mediaServer);
    }
);
utils.io.on("brickDisappears", function (json) {
        console.log("brickDisappears:", json);
        for (var indice in mediaServers) {
            if (mediaServers[indice] && mediaServers[indice].id === json.brickId) {
                mediaServers.splice(indice, 1);
            }
        }
    }
);
