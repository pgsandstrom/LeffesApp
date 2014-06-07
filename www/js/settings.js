$(function () {
	"use strict";

	//WARNING: This is some messed up ugly code. Maybe rewrite it all if you need to modify...

	var MOVE_LIMIT_BEFORE_SWITCH = 100;

	var $hamburger = $("#hamburger");
	var $settings = $("#settings");

	var switchOpen = function () {
		var settingsVisible = $settings.is(":visible");
		if (settingsVisible) {
//			console.log('switch to closing');
			$settings.addClass("animate");
			$hamburger.addClass("animate");
			$settings.bind("webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd", function () {
				$settings.hide();
				$hamburger.removeClass("animate");
				$settings.removeClass("animate");
				$settings.unbind("webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd");
			});
			$settings.removeClass("settings-open");
			$hamburger.removeClass("hamburger-open");
		} else {
//			console.log('switch to opening');
			$hamburger.addClass("animate");
			$settings.addClass("animate");
			$settings.show();
			setTimeout(function () {
//				console.log('switch opening callback');
				$settings.addClass("settings-open");
				$hamburger.addClass("hamburger-open");
				$settings.bind("webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd", function () {
					$hamburger.removeClass("animate");
					$settings.removeClass("animate");
					$settings.unbind("webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd");
				});
			}, 1);
		}
	};

	var close = function () {
		var callback = function () {
			$settings.hide();
			$settings.removeClass("settings-open");
			$hamburger.removeClass("hamburger-open");
			setContainerOffset(0, false);
		};
		setContainerOffset(70, true, callback); // Because settings take 70% of screen
	};

	var open = function () {
//		console.log('open');
		var callback = function () {
			$settings.addClass("settings-open");
			$hamburger.addClass("hamburger-open");
		};
		setContainerOffset(0, true, callback);
	};

	$hamburger.on("click", function () {
		console.log("hamburger clicked");
		switchOpen();
	});

	function handleHammer(ev) {

		//if settings is not visible, then ignore swipes etc
		if (!$settings.is(":visible")) {
			return;
		}

		//ugly hack to prevent hammer.js from intercepting clicks.........
		if (ev.type === 'release' && Math.abs(ev.gesture.deltaX) < 10) {
			return;
		}

		// disable browser scrolling
		ev.gesture.preventDefault();

		switch (ev.type) {
			case 'dragright':
			case 'dragleft':
				// stick to the finger
				var drag_offset = ((100 / 500) * ev.gesture.deltaX);
				setContainerOffset(drag_offset, false);
				break;

			case 'release':
				if (Math.abs(ev.gesture.deltaX) > MOVE_LIMIT_BEFORE_SWITCH) {
					if (ev.gesture.direction === 'right') {
//						console.log('release to right');
						close();
					} else {
//						console.log('release to left');
						open();
					}
				} else {
//					console.log('show self');
					open();
				}
				break;
		}
	}

	var $container = $("#settings-holder");
	var $swipeThingy = $container;

	//init hammer:
	new Hammer($swipeThingy[0], {
		behavior: {
			userSelect: true
		}
	}).on("release dragleft dragright", handleHammer);


	var earlierPercent = 0;

	function setContainerOffset(percent, animate, callback) {

		if (percent < 0) {
			return;
		}

		//fix for "TransitionEnd"-event not firing when the animation does not result in any movement (._.)
		if (earlierPercent <= 0 && percent <= 0) {
			return;
		}
		earlierPercent = percent;

		if (animate) {
			$hamburger.addClass("animate");
			$container.addClass("animate");

			$container.bind("webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd", function () {
				$container.css("transform", "");
				$hamburger.removeClass("animate");
				$container.removeClass("animate");
				if (callback !== undefined) {
					callback();
				}
				$container.unbind("webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd");
			});
		}

		if (Modernizr.csstransforms3d) {
			$container.css("transform", "translate3d(" + percent + "%,0,0) scale3d(1,1,1)");
		} else if (Modernizr.csstransforms) {
			$container.css("transform", "translate(" + percent + "%,0)");
		} else {
			console.log("whaeva we dont support this");
//			var px = ((pane_width * pane_count) / 100) * percent;
//			container.css("left", px + "px");
		}

	}
});