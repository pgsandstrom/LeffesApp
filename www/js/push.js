(function () {
    "use strict";

    var PUSH = "push";

    var innovation = window.innovation = window.innovation || {};
    innovation.push = innovation.push || {};

    //For testing:
    document.addEventListener("urbanairship.registration", function (event) {
        if (event.error) {
            console.log('there was an error registering for push notifications');
            console.log('there was an error registering for push notifications');
            console.log('there was an error registering for push notifications');
            console.log('there was an error registering for push notifications');
            console.log('there was an error registering for push notifications');
            console.log('there was an error registering for push notifications');
            console.log('there was an error registering for push notifications');
            console.log('there was an error registering for push notifications');
        } else {
            console.log("Registered with ID: " + event.pushID);
            console.log("Registered with ID: " + event.pushID);
            console.log("Registered with ID: " + event.pushID);
            console.log("Registered with ID: " + event.pushID);
            console.log("Registered with ID: " + event.pushID);
            console.log("Registered with ID: " + event.pushID);
            console.log("Registered with ID: " + event.pushID);
            console.log("Registered with ID: " + event.pushID);
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
            console.log("ENABLE PUSH");
            console.log("ENABLE PUSH");
            console.log("ENABLE PUSH");
            console.log("ENABLE PUSH");
            try {
                PushNotification.enablePush();
            } catch (e) {
                console.log("failed to enable push: " + e);
                console.log("failed to enable push: " + e);
                console.log("failed to enable push: " + e);
                console.log("failed to enable push: " + e);
                console.log("failed to enable push: " + e);
                console.log("failed to enable push: " + e);
                console.log("failed to enable push: " + e);
                console.log("failed to enable push: " + e);
                console.log("failed to enable push: " + e);
            }
        } else {
            console.log("DISABLE PUSH");
            console.log("DISABLE PUSH");
            console.log("DISABLE PUSH");
            console.log("DISABLE PUSH");
            console.log("DISABLE PUSH");
            try {
                PushNotification.disablePush();
            } catch (e) {
                console.log("failed to disable push: " + e);
                console.log("failed to disable push: " + e);
                console.log("failed to disable push: " + e);
                console.log("failed to disable push: " + e);
                console.log("failed to disable push: " + e);
                console.log("failed to disable push: " + e);
                console.log("failed to disable push: " + e);
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
        var active = localStorage.getItem(PUSH);
        if (active === undefined || active === null) {
            console.log("push was undefined, setting to true");
            innovation.push.setPush(true);
        } else {
            console.log("push was set, setting interface to " + active);
            innovation.view.setPushCheckbox(active);
        }
    };

    //set this to return to "first boot"-state.
//    localStorage.removeItem(PUSH);

})();