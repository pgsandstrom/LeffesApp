(function () {
    "use strict";

    var ARTICLES_LEFT_WHEN_UPDATE = 5;

    var innovation = window.innovation = window.innovation || {};
    innovation.data = innovation.data || {};

    innovation.data.Status = {};
    innovation.data.Status.UPDATED = "updated";
    innovation.data.Status.NETWORK_ERROR = "network_error";
    innovation.data.Status.SERVER_ERROR = "server_error";

    var postList;
    var newPosts;

    var pagesCount;
    var retrievedPagesCount = 0;
    var isRetrieving = false;


    var isNextPage = function () {
        return pagesCount === undefined || retrievedPagesCount < pagesCount;
    };

    var getNextPage = function () {
        innovation.api.get(retrievedPagesCount + 1, receivedNewPage);
    };

    var receivedNewPage = function (data) {

        //if error:
        if(data === undefined) {
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
            innovation.view.update(innovation.data.Status.UPDATED, newPosts);
        } finally {
//            console.log("finished update");
            isRetrieving = false;
        }
    };

//    innovation.data.getNewPosts = function () {
//        return newPosts;
//    };

    innovation.data.getPost = function(index) {
        return postList[index];
    };

    innovation.data.share = function (index) {
        var post = postList[index];
        console.log("share " + post.title + " with url " + post.url);
        innovation.share.link(post.title, post.url);
    };

    innovation.data.update = function (currentIndex) {
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
        console.log("update");

        isRetrieving = true;
        getNextPage();
    };

})();