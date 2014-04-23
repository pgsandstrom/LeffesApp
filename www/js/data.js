(function () {
    "use strict";

    var innovation = window.innovation = window.innovation || {};
    innovation.data = innovation.data || {};


    var pages;

    innovation.data.isNextPage = function () {

    };

    innovation.data.getNextPage = function () {

        var data = innovation.api.get(1);

        if (pages === undefined) {
            pages = data.pages;
            console.log("pages: " + pages);
        }


    };


})();