$(function () {
    var currentIndex = 0,
        itemCount = $('.carousel > li').length;

    /* add the active class to the first item to hide all the others */
    $('.carousel > li:eq(' + currentIndex + ')').addClass('active');

    $('.carousel-nav').on('click', function () {
        var $active = $('.carousel > li.active'),
            isNext = $(this).hasClass('next');
        currentIndex = (currentIndex + (isNext ? 1 : -1)) % itemCount;

        /* go back to the last item if we hit -1 */
        if (currentIndex === -1) {
            currentIndex = itemCount - 1;
        }

        var $next = $('.carousel > li:eq(' + currentIndex + ')');
        $active.addClass(isNext ? 'next-out' : 'prev-out');
        $next.addClass('active').addClass(isNext ? 'next-in' : 'prev-in');

        $active.on('animationend webkitAnimationEnd oAnimationEnd', function () {
            $active.removeClass('active next-out prev-out');
            $active.off('animationend webkitAnimationEnd oAnimationEnd');
            console.log("$active animationend");
        });
        $next.on('animationend webkitAnimationEnd oAnimationEnd', function () {
            $next.removeClass('next-in prev-in');
            $next.off('animationend webkitAnimationEnd oAnimationEnd');
            console.log("next animationend");
        });


        return false;
    });
});