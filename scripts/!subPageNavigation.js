var subPageNavigation = function() {
	var subPageNav = Array.prototype.slice.call(document.querySelectorAll('nav.two > a'));
	var subPages = Array.prototype.slice.call(document.querySelectorAll('.subpage'));

	var toggleDisplayState = function() {
		for (var i = 0; i < subPageNav.length; i++) {
			if (hasClass(subPageNav[i], "active")) {
				removeClass(subPageNav[i], "active");
				subPages[i].style.display = "none";
			}
			else {
				subPageNav[i].className += " active";
				subPages[i].style.display = "block";
			}
		}
	};

	for (var i = 0; i < subPageNav.length; i++) {
		subPageNav[i].addEventListener('click', function() { toggleDisplayState(this); }, false);
	}
};