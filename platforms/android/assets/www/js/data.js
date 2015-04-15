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

	var receivedNewPage = function (data, hasAddedRandom) {
		console.log("receivedNewPage 1: " + hasAddedRandom);
		console.log("receivedNewPage 2: " + data.posts.length);

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

		//If this is the first page, check if we should get a random first post:
		if (!hasAddedRandom && retrievedPagesCount === 0) {
			console.log("adding random page");
			var isRequired = checkIsRandomPostRequired(data);
			if (isRequired) {
				addRandomPost(data);
				return;
			}
		}

		retrievedPagesCount++;

		update(data.posts);
	};

	var checkIsRandomPostRequired = function (data) {
		var posts = data.posts;
		var newestPost = posts[0];
		var date = newestPost.date.split(' ')[0];

		//TODO
		return true;
	};

	var addRandomPost = function (data) {
		innovation.api.addRandom(data, receivedNewPage);
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