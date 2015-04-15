(function () {
	"use strict";

	var innovation = window.innovation = window.innovation || {};
	innovation.notification = innovation.notification || {};

	innovation.notification.start = function () {

		var tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);

		tomorrow.setHours(9);
		tomorrow.setMinutes(0);

		var dateString = tomorrow.getUTCFullYear() + "/" + (tomorrow.getUTCMonth() + 1) + "/" + tomorrow.getUTCDate() + " " + tomorrow.getUTCHours() + ":" + tomorrow.getUTCMinutes() + ":" + tomorrow.getUTCSeconds();
		console.log("3 plox date: " + dateString);

		var soon = new Date();
		soon.setSeconds(soon.getSeconds() + 3);

		cordova.plugins.notification.local.schedule({
			title: "Tusentips",
			text: "Ett nytt tips har publicerats",
			every: "day",
			//,			firstAt:  new Date()
			at: soon
		});

		//cordova.plugins.notification.local.on("click", function (notification) {
		//joinMeeting(notification.data.meetingId);
		//});
	};


})();