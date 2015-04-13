(function () {
	"use strict";

	var ARTICLES_LEFT_WHEN_UPDATE = 5;

	var innovation = window.innovation = window.innovation || {};
	innovation.data = innovation.data || {};

	var postList;

	var pagesCount;
	var retrievedPagesCount;
	var isRetrieving;

	innovation.data.reset = function () {
		//TODO: Use OO-design instead of fugly reset-functions...
		postList = undefined;
		pagesCount = undefined;
		retrievedPagesCount = 0;
		isRetrieving = false;
	};
	innovation.data.reset();

	var isNextPage = function () {
		return pagesCount === undefined || retrievedPagesCount < pagesCount;
	};

	var getNextPage = function () {
		innovation.api.get(retrievedPagesCount + 1, receivedNewPage);
	};

	var receivedNewPage = function (data) {

		//if error:
		if (data === undefined) {
			var firstPage = pagesCount === undefined;
			innovation.view.retrieveError(firstPage);
			isRetrieving = false;
			return;
		}

		if (pagesCount === undefined) {
			pagesCount = data.pages;
//            console.log("pages: " + pagesCount);
		}

		retrievedPagesCount++;

		update(data.posts);
	};

	var updatePostList = function (newPosts) {
		if (postList === undefined) {
			postList = newPosts;
		} else {
			postList.push.apply(postList, newPosts);
		}
	};


	var update = function (newPosts) {
		try {
			updatePostList(newPosts);
			innovation.view.update(newPosts);
		} finally {
//            console.log("finished update");
			isRetrieving = false;
		}
	};

	innovation.data.getPost = function (index) {
		return postList[index];
	};

	innovation.data.share = function (index) {
		var post = postList[index];
		console.log("share " + post.title + " with url " + post.url);
		innovation.share.link(post.title, post.url);
	};

	innovation.data.update = function (currentIndex) {  //TODO rename function
		if (isRetrieving) {
			return;
		}

		if (!isNextPage()) {
			console.log("is no next page");
			return;
		}

		if (postList !== undefined && postList.length > currentIndex + ARTICLES_LEFT_WHEN_UPDATE) {
			console.log("dont update");
			return;
		}
//        console.log("update");

		isRetrieving = true;
		getNextPage();
	};

})();