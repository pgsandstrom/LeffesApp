(function () {
    "use strict";

//   en viss kategori: http://tusentips.se/api/get_category_posts/?category_slug=tips

    //rubbet:
    //sida 1: http://tusentips.se/?json=1
    //sida 2: http://tusentips.se/page/2/?json=1

    var HOST = 'http://tusentips.se';

    var innovation = window.innovation = window.innovation || {};
    innovation.api = innovation.api || {};

    /**
     * get the articles and stuff!
     * @param page 1-indexed
     * @param callback callback that takes the data (send null if error)
     */
    innovation.api.get = function (page, callback) {
        var url;

        if (page === 1) {
            url = HOST + '/?json=1';
        } else {
            url = HOST + '/page/' + page + '/?json=1';
        }

//        var url = HOST;
//        $.get(url, function (data) {
//            alert("success");
//        })
//            .done(function (data) {
//                alert("second success");
//            })
//            .fail(function (data) {
//                alert("error");
//            })
//            .always(function (data) {
////                alert( "finished" );
//            });

        var result;
        $.ajax({
            url: url,
            success: function (data, textStatus, jqXHR) {
                callback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                callback();
            },
            async: true
        });
    };


})();