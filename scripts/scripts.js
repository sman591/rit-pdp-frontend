//@prepros-prepend !contentLoaded.js

var hasClass = function (element, className) {
	return new RegExp(' ' + className + ' ').test(' ' + element.className + ' ');
};
var removeClass = function (element, removeClass) {
	var regex = new RegExp('(?:^|\\s)' + removeClass + '(?!\\S)');
	element.className = element.className.replace(regex, '' );
};

contentLoaded(window, function() {
	// To stop stuff from animating on page load
	document.querySelector("body").className = "";

	// Done like this so I can have multiple files minified into 1 later
	subPageNavigation();
	committeePageNavigation();
});

// @prepros-append !committeePageNavigation.js
// @prepros-append !subPageNavigation.js