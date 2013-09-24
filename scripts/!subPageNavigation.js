var subPageNavigation = function(subPageNav) {
	var subPages = toArray(document.querySelectorAll('.subpage'));

	var toggleDisplayState = function(el, i) {
		if (!hasClass(el, "active")) {
			for (var j = 0; j < subPageNav.length; j++) {
				removeClass(subPageNav[j], "active");
				subPages[j].style.display = "none";
			}
			el.className += " active";
			subPages[i].style.display = "block";
		}
	};

	for (var i = 0; i < subPageNav.length; i++) {
		(function (i) {
			subPageNav[i].addEventListener('click', function() { toggleDisplayState(this, i); }, false);
		})(i)
	}
};