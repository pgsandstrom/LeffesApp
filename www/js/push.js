(function () {
    "use strict";

    var PUSH = "push";

    var innovation = window.innovation = window.innovation || {};
    innovation.push = innovation.push || {};

    //For testing:
    document.addEventListener("urbanairship.registration", function (event) {
        if (event.error) {
            console.log('there was an error registering for push notifications');
        } else {
            console.log("Registered with ID: " + event.pushID);
        }
    }, false);

    innovation.push.getPush = function () {
        return localStorage.getItem(PUSH);
    };

    innovation.push.setPush = function (active) {
        var earlierState = localStorage.getItem(PUSH);
        if (earlierState !== active) {
            localStorage.setItem(PUSH, active);
        } else {
            throw "error: push state was already " + active;
        }

        if (active) {
            console.log("ENABLE PUSH");
            try {
                PushNotification.enablePush();
            } catch (e) {
                console.log("failed to enable push: " + e);
            }
        } else {
            console.log("DISABLE PUSH");
            try {
                PushNotification.disablePush();
            } catch (e) {
                console.log("failed to disable push: " + e);
            }
        }

        //update the view:
        innovation.view.setPushCheckbox(active);

//        PushNotification.isPushEnabled(function (enabled) {
//            if(enabled) {
//                PushNotification.enablePush();
//            } else {
//                PushNotification.disablePush();
//            }
//        });
    };

    innovation.push.init = function () {
        console.log("innovation.push.init");
        var active = localStorage.getItem(PUSH);
        if (active === undefined || active === null) {
            console.log("push was undefined, setting to true");
            innovation.push.setPush(true);
        } else {
            console.log("push was set, setting interface to " + active);
            innovation.view.setPushCheckbox(active);
        }
    };

    innovation.push.resetBadge = function () {
        console.log("resetBadge");
        try {
            var devicePlatform = window.device.platform;
            console.log("devicePlatform: \"" + devicePlatform + "\"");
            if (devicePlatform === "iPhone") {
                console.log("gonna reset badge!");
                PushNotification.resetBadge(function (data) {
                    console.log("resetBadge callback");
                });
            } else {
                console.log("This is not iPhone, not resetting badge");
            }
        } catch (e) {
            console.log("failed to detect device and reset badge: " + e);
        }
    };

    //set this to return to "first boot"-state.
//    localStorage.removeItem(PUSH);

})();