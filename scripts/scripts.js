//@prepros-prepend !contentLoaded.js

contentLoaded(window, function() {
	// To stop stuff from animating on page load
	document.querySelector("body").className = "";

	// Done like this so I can have multiple files minified into 1 later
	committeePageNavigation();
});

// @prepros-append !committeePageNavigation.js