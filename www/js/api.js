(function () {
	"use strict";

//   en viss kategori: http://tusentips.se/api/get_category_posts/?category_slug=tips

	//rubbet:
	//sida 1: http://tusentips.se/?json=1
	//sida 2: http://tusentips.se/page/2/?json=1

	//posta kommentar:
	//http://tusentips.se?json=respond.submit_comment

	var HOST = 'http://tusentips.se';

	var innovation = window.innovation = window.innovation || {};
	innovation.api = innovation.api || {};

	innovation.api.postComment = function (postId, name, email, content, callback) {
		var url = HOST + '/?json=respond.submit_comment&post_id=' + postId + '&name=' + name + '&email=' + email + '&content=' + content;

		$.ajax({
			url: url,
			success: function (data, textStatus, jqXHR) {
				callback(data);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				callback();
			},
			async: true,
			cache: false
		});
	};

	/**
	 * get the articles and stuff!
	 * @param page 1-indexed
	 * @param callback callback that takes the data (send null if error) and if we have added a random post to the data
	 */
	innovation.api.get = function (page, callback) {
		var url;

		if (page === 1) {
			url = HOST + '/?json=1';
		} else {
			url = HOST + '/page/' + page + '/?json=1';
		}

		$.ajax({
			url: url,
			success: function (data, textStatus, jqXHR) {
				callback(data, false);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				callback();
			},
			async: true,
			cache: false
		});
	};

	/**
	 * Add a random post to the list of posts
	 * @param data the data that is received from api.get()
	 * @param callback callback that takes the data (send null if error) and if we have added a random post to the data
	 */
	innovation.api.addRandom = function (data, callback) {
		var url = HOST + '/random';

		//TODO: Excludera ref-taggen! Fast gör det på server-sidan...

		$.ajax({
			url: url,
			success: function (newData, textStatus, jqXHR) {

				//ugly code to compensate for my weird /random url
				if (typeof newData == 'string' || newData instanceof String) {
					newData = newData.replace('\\\\r\\\\n','<br>');
					newData = newData.replace('\\r\\n','<br>');
					newData = newData.replace('&nbsp;','<br>');
					newData = JSON.parse(newData);
				}

				console.log("newData 0: " + newData);
				console.log("newData 1: " + JSON.stringify(newData));
				data.posts.unshift(newData);
				callback(data, true);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				callback();
			},
			async: true,
			cache: false
		});
	};

})();