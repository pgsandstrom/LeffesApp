$(function () {
    "use strict";

    var innovation = window.innovation = window.innovation || {};
    innovation.view = innovation.view || {};

    var $carousel = $('.carousel');

    var currentIndex = 0;

    var itemCount = $('.carousel > li').length;

    $(".plus").on("click", function () {
        console.log("clicked plus");
        $('#comment-window').toggle();
    });

    $("#comment-cancel").on("click", function () {
        $('#comment-window').hide();
    });

    $("#comment-post").on("click", function () {
        var post = innovation.data.getPost(currentIndex);
        var text = $('#comment-input').val();
        var name = $('#comment-name').val();
        var mail = $('#comment-mail').val();

//        console.log("id: " + post.id);
//        console.log("text: " + text);
//        console.log("name: " + name);
//        console.log("mail: " + mail);

        if(text === '') {
            alert("Du måste ange en kommentar");
            return;
        }
        if(name === '') {
            alert("Du måste ange ett namn");
            return;
        }
        if(mail === '') {
            alert("Du måste ange en mail");
            return;
        }
        if(mail === '') {
            alert("Du måste ange en mail");
            return;
        }

        if(!validateEmail(mail)) {
            alert("Du måste ange en giltig mail");
            return;
        }

        $("#comment-post").text("Skickar...");

        innovation.api.postComment(post.id, name, mail, text, function(data) {
            console.log("data: "+data);
            $('#comment-input').val('');
            $('#comment-name').val('');
            $('#comment-mail').val('');
            $("#comment-post").text("SKICKA");
            $('#comment-window').hide();
            alert("Ditt meddelande väntar nu godkännande innan publicering");
        });
    });

    $(".share").on("click", function () {
        innovation.data.share(currentIndex);
    });

    var updateItemCount = function () {
        itemCount = $carousel.children().length;
    };

    var updateButtons = function () {
        if (currentIndex === 0) {
            $('.prev').parent().hide();
            $('.prev-disabled').parent().show();
        } else {
            $('.prev').parent().show();
            $('.prev-disabled').parent().hide();
        }

        if (itemCount === 0 || currentIndex === itemCount - 1) {
            $('.next').parent().hide();
            $('.next-disabled').parent().show();
        } else {
            $('.next').parent().show();
            $('.next-disabled').parent().hide();
        }
    };

    /* add the active class to the first item to hide all the others */
    $('.carousel > li:eq(' + currentIndex + ')').addClass('active');

    $('.carousel-nav').on('click', function () {
        var $active = $('.carousel > li.active');
        var isNext = $(this).hasClass('next');


        currentIndex = (currentIndex + (isNext ? 1 : -1));

        var $next = $('.carousel > li:eq(' + currentIndex + ')');
        $active.addClass(isNext ? 'next-out' : 'prev-out');
        $next.addClass('active').addClass(isNext ? 'next-in' : 'prev-in');

        $active.on('animationend webkitAnimationEnd oAnimationEnd', function () {
            $active.removeClass('active next-out prev-out');
            $active.off('animationend webkitAnimationEnd oAnimationEnd');
        });
        $next.on('animationend webkitAnimationEnd oAnimationEnd', function () {
            $next.removeClass('next-in prev-in');
            $next.off('animationend webkitAnimationEnd oAnimationEnd');
        });

        if (isNext) {
            innovation.data.update(currentIndex);
        }

        updateButtons();

        return false;
    });

    var updateView = function (newPosts) {
//        console.log("update view");
        $('#init-loading').hide();

//        newPosts.forEach(function (post) {
        _.each(newPosts, function (post) {
            //TODO: This is some ugly code right here
            var firstAdd = $carousel.children().length === 0;
            var initClass = firstAdd ? 'active' : '';
            var date = post.date.split(' ')[0]; // Split after first space to avoid time of day.

            var $post = $('<li class="' + initClass + '"><div class=post-date>' + date + '</div><div class=post-title>' + post.title + '</div><div class="post-body">' + post.content + '</div><div class="comments"></div></li>');
            $carousel.append($post);

            //fix links in content:

            //this needs a plugin...
            //http://stackoverflow.com/questions/17887348/phonegap-open-link-in-browser
//            var $aList = $post.find('a');
//            $aList.each(function (index) {
//                var $a = $(this);
//                var href = $a.attr('href');
//                $a.attr('href', '#');
//                $a.attr('onclick', 'window.open("' + href + '", "_system");');
//            });

            //does not work for iOS7:
//            var $aList = $post.find('a');
//            $aList.each(function (index) {
//                var $a = $(this);
//                var href = $a.attr('href');
//                $a.attr('href', '#');
//                $a.attr('onclick', "navigator.app.loadUrl('" + href + "', { openExternal:true });");
//            });


            //fix comments:
            var $comments = $post.find('.comments');
            $comments.html('<div class="comments-title">Kommentarer</div><div class="comments-body"></div>');

            var $commentsBody = $comments.find('.comments-body');
            if (post.comments.length === 0) {
                $commentsBody.html('Inga kommentarer ännu');
            } else {
                _.each(post.comments, function (comment) {
                    $commentsBody.append('<div class="comment-title">' + comment.name + ' skriver:</div><div class="comment-body">' + comment.content + '</div><div class="comment-date">' + comment.date + '</div>');
                });
            }

        });

        //fix to make sure shareaholic doesn't ruin the view:
        $('.shareaholic-canvas').remove();

        updateItemCount();
        updateButtons();
    };

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    innovation.view.update = function (status, newPosts) {
//        console.log("status update: " + status);
        if (status === innovation.data.Status.UPDATED) {
            updateView(newPosts);
        } else if (status === innovation.data.Status.NETWORK_ERROR) {
            //TODO just nu använder vi retrieveError-funktionen...
        } else if (status === innovation.data.Status.SERVER_ERROR) {
            //TODO just nu använder vi retrieveError-funktionen...
        }
    };

    /**
     * There was an error retrieving data
     * @param firstPage if it was the first page that failed
     */
    innovation.view.retrieveError = function (firstPage) {
        if (firstPage) {
            $('#init-loading').html("<div>Nätverksfel.</div><div>Var god starta om appen.</div>");
        }
    };

    updateButtons();
    innovation.data.update(currentIndex);
});