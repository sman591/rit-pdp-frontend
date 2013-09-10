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

	if(window.location.href.indexOf("committee") > -1) {
       	subPageNavigation();
		committeePageNavigation();
    }
    if(window.location.href.indexOf("contact") > -1) {
    	contact();
    }

});

// @prepros-append !committeePageNavigation.js
// @prepros-append !subPageNavigation.js
// @prepros-append !contact.js