(function () {
    "use strict";

//    http://pgsandstrom.wpengine.com/api/get_category_posts/?category_slug=tips
    var HOST = 'http://pgsandstrom.wpengine.com';

    var innovation = window.innovation = window.innovation || {};
    innovation.api = innovation.api || {};


    innovation.api.get = function() {
        $.get( HOST+'/api/get_category_posts/?category_slug=tips', function() {
            alert( "success" );
        })
            .done(function() {
                alert( "second success" );
            })
            .fail(function() {
                alert( "error" );
            })
            .always(function() {
                alert( "finished" );
            });
    };


})();