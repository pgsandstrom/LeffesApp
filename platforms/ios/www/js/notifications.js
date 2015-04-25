(function () {
	"use strict";

	var innovation = window.innovation = window.innovation || {};
	innovation.notification = innovation.notification || {};

	var NOTIFICATION_ID = 1;
	var STORAGE_ACTIVE = "notification_active";

	innovation.notification.start = function () {
		var storageActive = localStorage.getItem(STORAGE_ACTIVE);
		console.log("notification.start: " + storageActive);
		if (storageActive == null) {
			storageActive = true;
			localStorage.setItem(STORAGE_ACTIVE, storageActive);
		}
		innovation.view.setPushCheckbox(storageActive);
		innovation.notification.setNotification(storageActive);
	};

	innovation.notification.setNotification = function (active) {
		console.log("notification.setNotification: " + active);
		localStorage.setItem(STORAGE_ACTIVE, active);
		if (active === true || active === "true") {
			activate();
		} else {
			deactivate();
		}
	};

	var activate = function () {
		console.log("notification.activate");
		var tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);

		tomorrow.setHours(8);
		tomorrow.setMinutes(30);

		var dateString = tomorrow.getUTCFullYear() + "/" + (tomorrow.getUTCMonth() + 1) + "/" + tomorrow.getUTCDate() + " " + tomorrow.getUTCHours() + ":" + tomorrow.getUTCMinutes() + ":" + tomorrow.getUTCSeconds();
		console.log("3 plox date: " + dateString);

		var soon = new Date();
		soon.setSeconds(soon.getSeconds() + 10);

		cordova.plugins.notification.local.schedule({
			id: NOTIFICATION_ID,
			title: "Tusentips",
			text: "Dagens tips",
			every: "day",
			//at: soon
			at: tomorrow
		});

		//cordova.plugins.notification.local.on("click", function (notification) {
		//joinMeeting(notification.data.meetingId);
		//});
	};

	var deactivate = function () {
		//console.log("notification deactivate 1");
		//cordova.plugins.notification.local.cancel(NOTIFICATION_ID, function () {
		//}, function () {
		//	console.log("whaeva");
		//});
		//console.log("notification deactivate 2");

		//console.log("notification deactivate 1");
		//cordova.plugins.notification.local.cancelAll(function() {
		//	console.log("notification deactivate 3");
		//}, window);
		//console.log("notification deactivate 2");

		cordova.plugins.notification.local.cancel(NOTIFICATION_ID, function () {
			console.log("notification deactivate 4");
		}, undefined);

		cordova.plugins.notification.local.cancel(NOTIFICATION_ID, function () {
			console.log("notification deactivate 5");
		}, window);

		cordova.plugins.notification.local.cancel(NOTIFICATION_ID, function () {
			console.log("notification deactivate 6");
		}, this);
	};

})();