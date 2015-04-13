(function () {
	"use strict";

	var innovation = window.innovation = window.innovation || {};
	innovation.share = innovation.share || {};

	innovation.share.link = function (text, url) {
		var message = {
			text: text,
			url: url
		};

		try {
			window.socialmessage.send(message);
		} catch (e) {
			console.log("failed to find socialmessage");
			alert("Tyvärr kunde inte delningsfunktionen startas");
		}
	};

})();