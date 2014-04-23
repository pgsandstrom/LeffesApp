(function () {
    "use strict";

    var innovation = window.innovation = window.innovation || {};
    innovation.data = innovation.data || {};

    innovation.data.Status = {};
    innovation.data.Status.DONE = "done";
    innovation.data.Status.UPDATED = "updated";
    innovation.data.Status.NETWORK_ERROR = "network_error";
    innovation.data.Status.SERVER_ERROR = "server_error";

    var postList;
    var newPosts;

    var pagesCount;
    var retrievedPagesCount;
    var isRetrieving = false;


    var isNextPage = function () {
        return pagesCount === undefined || retrievedPagesCount > pagesCount;
    };

    var getNextPage = function () {

        var data = innovation.api.get(1);

        if (pagesCount === undefined) {
            pagesCount = data.pages;
            console.log("pages: " + pagesCount);
        }

        return data.posts;
    };

    var updatePostList = function (newPosts) {
        if (postList === undefined) {
            postList = newPosts;
        } else {
            postList.push.apply(postList, newPosts);
        }
    };


    var update = function (listener) {
        try {
            if (!isNextPage()) {
                listener.status(innovation.data.Status.DONE);
                return;
            }

            newPosts = getNextPage();
            updatePostList(newPosts);
            listener.status(innovation.data.Status.UPDATED, newPosts);
        } finally {
            console.log("finished update");
            isRetrieving = false;
        }
    };

    innovation.data.getNewPosts = function () {
        return newPosts;
    };

    /**
     * u know
     * @param listener should have status(status)done(status)-function.
     */
    innovation.data.update = function (listener) {
        if (isRetrieving) {
            return;
        }
        isRetrieving = true;
//        _.defer(update(listener));
        setTimeout(function () {
            update(listener);
        }, 2000);
    };

})();