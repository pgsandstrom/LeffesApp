(function () {
	"use strict";

	var innovation = window.innovation = window.innovation || {};
	innovation.notification = innovation.notification || {};

	innovation.notification.start = function () {
		//	cordova.plugins.notification.local.schedule({
		//		id: 1,
		//		title: "Production Jour fixe",
		//		text: "Duration 1h",
		//		firstAt: monday_9_am,
		//		every: "day",
		//		//sound: "file://sounds/reminder.mp3",
		//		//icon: "http://icons.com/?cal_id=1",
		//		data: { meetingId:"123#fg8" }
		//	});
		//
		//	cordova.plugins.notification.local.on("click", function (notification) {
		//		joinMeeting(notification.data.meetingId);
		//	});

		cordova.plugins.notification.local.schedule({
			title: "New Message",
			message: "Hi, are you ready? We are waiting."
			//sound: "file://sounds/message.mp3",
			//icon: "http://my.domain.de/avatar/user#id=123"
		});
	};


})();