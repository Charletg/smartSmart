var utils = require("../../js/utils.js");

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
            console.log(utils);
            utils.call(idFirstBrick,
                'Browse',
                [1],
                function (res) {
                    console.log("Reponse XML :  " + res);
                    convertXmlToDom(res, "demo");
                });
            utils.call(idFirstBrick,
                'getMetaData',
                [1],
                function (res) {
                    console.log("Reponse XML :  " + res);
                    convertXmlToDom(res, "bis");
                });
        }
        window.mediaServers = mediaServers;
    },
    function (err) {
        return err;
    }
);
function convertXmlToDom(xml, id) {
    var parser, xmlDoc;
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(xml, "text/xml");
    document.getElementById(id).innerHTML =
        myLoop(xmlDoc.documentElement);
}
function myLoop(x) {
    var y, xLen, txt;
    txt = "";
    x = x.childNodes;
    xLen = x.length;
    for (var i = 0; i < xLen; i++) {
        y = x[i];
        if(y.nodeName === "Result"){
            txt += "<br />" + "<br />" + "<br />" + y.childNodes[0].nodeValue + "<br />" + "<br />" + "<br />";
        }
        if (y.nodeType !== 3) {
            if (y.childNodes[0] !== undefined) {
                console.log("y : " + y);
                txt += myLoop(y);
            }
        }
    }
    return txt;
}

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
