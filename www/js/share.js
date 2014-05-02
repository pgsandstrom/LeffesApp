(function () {
    "use strict";

    var innovation = window.share = window.share || {};
    innovation.share = innovation.share || {};


    innovation.share.link = function (text, url) {
        var message = {
            text: text,
            url: url
        };

        console.log("message: " + message);

//        console.log("window.socialmessage: " + window.socialmessage);
//        console.log("window.socialmessage.send: " + window.socialmessage.send);
//        console.log("window.SocialMessage: " + window.SocialMessage);
//        console.log("window.SocialMessage.send: " + window.SocialMessage.send);
//        window.SocialMessage.send(message);
        window.socialmessage.send(message);
    };

    $(".share2").on("click", function(){
        innovation.share.link('DN', 'http://www.dn.se');
    });


})();