$(function () {
    "use strict";

    var innovation = window.innovation = window.innovation || {};
    innovation.view = innovation.view || {};

    var $carousel = $('.carousel');

    var currentIndex = 0;
    var retrievedAllPages = false;

    var itemCount = $('.carousel > li').length;

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
//            $carousel.append('<li class="INSERT-initClass"><div class=post-title>INSERT-title</div><div class="post-body">INSERT-post_content</div></li>');
            var $post = $('<li class="' + initClass + '"><div class=post-title>' + post.title + '</div><div class="post-body">' + post.content + '</div><div class="comments"></div></li>');
            $carousel.append($post);

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

    var Listener = function Listener() {
    };

    Listener.prototype.status = function (status, newPosts) {
//        console.log("status update: " + status);
        if (status === innovation.data.Status.DONE) {
            retrievedAllPages = true;
        } else if (status === innovation.data.Status.UPDATED) {
            updateView(newPosts);
        } else if (status === innovation.data.Status.NETWORK_ERROR) {
            //TODO
        } else if (status === innovation.data.Status.SERVER_ERROR) {
            //TODO
        }
    };

    updateButtons();
    innovation.data.update(new Listener());
});